#!/usr/bin/env node

// Checks accent colours for brand drift and contrast.
// Usage: node check-colour.mjs <hex> [<hex> ...] [--on <background-hex>] [--brand <brand-hex>]
// Example: node check-colour.mjs "#CF4A0C" --brand "#FA4B09" --on "#FFFFFF"

const args = process.argv.slice(2);
const flag = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
};
const background = flag('--on') || '#FFFFFF';
const brand = flag('--brand');
const flagValueIndexes = new Set(['--on', '--brand'].map((name) => args.indexOf(name)).filter((i) => i !== -1).map((i) => i + 1));
const colours = args.filter((arg, i) => !arg.startsWith('--') && !flagValueIndexes.has(i));

if (colours.length === 0) {
  console.error('Usage: node check-colour.mjs <hex> [<hex> ...] [--on <background-hex>] [--brand <brand-hex>]');
  process.exit(1);
}

function parseHex(hex) {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Not a hex colour: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
}

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

function oklch(hex) {
  const [r, g, b] = parseHex(hex).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function family({ L, C, H }) {
  if (C < 0.03) return L < 0.3 ? 'near-black' : L > 0.9 ? 'near-white' : 'grey';
  if (H >= 20 && H < 75) {
    if (L < 0.5 || (L < 0.62 && C < 0.19)) return 'brown / rust';
    return H < 45 ? 'red-orange' : 'orange / amber';
  }
  if (H < 20 || H >= 345) return L < 0.45 ? 'maroon' : 'red / pink';
  if (H < 110) return 'yellow / olive';
  if (H < 170) return 'green';
  if (H < 215) return 'teal / cyan';
  if (H < 275) return 'blue';
  if (H < 310) return 'violet';
  return 'magenta / pink';
}

const brandInfo = brand ? { hex: brand, ...oklch(brand) } : null;
const results = colours.map((hex) => {
  const value = oklch(hex);
  const warnings = [];
  const fam = family(value);
  if (fam === 'near-black') warnings.push('Near-black: do not use as a filled primary button on a light UI.');
  if (fam === 'brown / rust' || fam === 'maroon') warnings.push(`Reads as ${fam}: a brand orange or red darkened this far no longer looks like the brand.`);
  if (brandInfo) {
    const hueGap = Math.min(Math.abs(value.H - brandInfo.H), 360 - Math.abs(value.H - brandInfo.H));
    const lightGap = brandInfo.L - value.L;
    // Only compare shades of the brand family; a blue link colour is not brand drift.
    if (hueGap <= 40 && lightGap > 0.06) warnings.push(`Darker than the brand by ${lightGap.toFixed(2)} L. Keep large fills near the brand; use darker shades only for small text.`);
    if (hueGap > 12 && hueGap <= 40) warnings.push(`Hue drifts ${hueGap.toFixed(0)} degrees from the brand.`);
  }
  const ratio = contrast(hex, background);
  const white = contrast('#FFFFFF', hex);
  return {
    colour: hex,
    oklch: `oklch(${value.L.toFixed(3)} ${value.C.toFixed(3)} ${value.H.toFixed(1)})`,
    reads_as: fam,
    contrast_on_background: `${ratio.toFixed(2)}:1 on ${background} (text needs 4.5, UI parts 3.0)`,
    white_label_contrast: `${white.toFixed(2)}:1 (4.5 for normal text, 3.0 for 18px+ or 14px+ bold)`,
    warnings,
  };
});

console.log(JSON.stringify({ brand: brandInfo ? brandInfo.hex : null, background, results }, null, 2));
process.exitCode = results.some((r) => r.warnings.length) ? 2 : 0;
