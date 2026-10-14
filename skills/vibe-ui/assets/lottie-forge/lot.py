"""Tiny Lottie JSON builder used to port the Rive widgets.

Model: one shape layer per top-level element, nested shape groups ("gr") for the
Rive group hierarchy, so group opacity propagates the same way it does in Rive.
Children are passed bottom -> top (Rive creation order); Lottie wants top -> bottom.
"""
import json, math

FPS = 60

# ---------------------------------------------------------------- colours
def rgba(c):
    """'#AARRGGBB' | '#RRGGBB' -> (r, g, b, a) in 0..1"""
    c = c.lstrip("#")
    if len(c) == 6: c = "ff" + c
    a, r, g, b = (int(c[i:i + 2], 16) / 255 for i in (0, 2, 4, 6))
    return r, g, b, a

def r4(v): return round(v, 4)
def r2(v): return round(v, 2)

# ---------------------------------------------------------------- easing
LINEAR = ((0.0, 0.0), (1.0, 1.0))
EASE = ((0.45, 0.0), (0.25, 1.0))
OUT = ((0.16, 1.0), (0.3, 1.0))
INQ = ((0.5, 0.0), (0.75, 0.0))
BACK = ((0.34, 1.56), (0.64, 1.0))
SLAM = ((0.55, 0.0), (1.0, 0.45))
GEASE = ((0.42, 0.0), (0.58, 1.0))
HOLD = "hold"

def elastic_out(t, period, amp=1.0):
    if t <= 0: return 0.0
    if t >= 1: return 1.0
    s = period / 4
    return amp * 2 ** (-10 * t) * math.sin((t - s) * 2 * math.pi / period) + 1

# ---------------------------------------------------------------- animated values
class Track:
    """Keyframes for one property. Values are lists (vectors) or scalars."""
    def __init__(self):
        self.k = []          # (frame, value(list), ease)
    def key(self, f, v, ease=LINEAR):
        v = list(v) if isinstance(v, (list, tuple)) else [v]
        self.k.append((f, v, ease)); return self
    def elastic(self, f0, f1, v0, v1, period, step=2):
        """Sample an elastic-out curve between f0 and f1 (Rive 'elastic' keys)."""
        v0 = list(v0) if isinstance(v0, (list, tuple)) else [v0]
        v1 = list(v1) if isinstance(v1, (list, tuple)) else [v1]
        f = f0
        while f < f1:
            e = elastic_out((f - f0) / (f1 - f0), period)
            self.k.append((f, [a + (b - a) * e for a, b in zip(v0, v1)], LINEAR))
            f += step
        return self
    def json(self, scale=1.0):
        ks = sorted(self.k, key=lambda x: x[0])
        # de-dupe same frame (last one wins)
        d = {}
        for f, v, e in ks: d[f] = (v, e)
        ks = [(f, *d[f]) for f in sorted(d)]
        if len(ks) == 1:
            return {"a": 0, "k": _val(ks[0][1], scale)}
        out = []
        for i, (f, v, e) in enumerate(ks):
            kf = {"t": f, "s": [r4(x * scale) for x in v]}
            if i < len(ks) - 1:
                if e == HOLD:
                    kf["h"] = 1
                else:
                    (x1, y1), (x2, y2) = e
                    n = len(v)
                    kf["o"] = {"x": [x1] * n, "y": [y1] * n}
                    kf["i"] = {"x": [x2] * n, "y": [y2] * n}
            out.append(kf)
        return {"a": 1, "k": out}

def _val(v, scale=1.0):
    if isinstance(v, (list, tuple)):
        return [r4(x * scale) for x in v] if len(v) != 1 else r4(v[0] * scale)
    return r4(v * scale)

def prop(v, scale=1.0):
    if isinstance(v, Track): return v.json(scale)
    return {"a": 0, "k": _val(v, scale)}

class ColorTrack(Track):
    """Colour keys given as hex strings; also yields an opacity track."""
    def key(self, f, c, ease=LINEAR):
        self.k.append((f, list(rgba(c)), ease)); return self
    def rgb(self):
        t = Track(); t.k = [(f, v[:3] + [1], e) for f, v, e in self.k]; return t
    def alpha(self):
        t = Track(); t.k = [(f, [v[3] * 100], e) for f, v, e in self.k]; return t

# ---------------------------------------------------------------- shapes
def tr(x=0, y=0, r=0, sx=100, sy=100, o=100, ax=0, ay=0, pos=None, scale=None):
    """Group transform. pos/scale may be a Track (2D) to animate."""
    p = pos if pos is not None else [x, y]
    s = scale if scale is not None else [sx, sy]
    return {"ty": "tr", "p": prop(p), "a": prop([ax, ay]), "s": prop(s), "r": prop(r), "o": prop(o),
            "sk": {"a": 0, "k": 0}, "sa": {"a": 0, "k": 0}}

def group(name, items_bottom_to_top, **t):
    """items: shapes/paints in Rive order (bottom first). Paint items of this group go in `paints`."""
    return {"ty": "gr", "nm": name, "it": list(reversed(items_bottom_to_top)) + [tr(**t)]}

def shape_group(name, geoms, paints, **t):
    """A Rive 'shape': geometry + its paints (fills/strokes, first paint at the bottom)."""
    return {"ty": "gr", "nm": name, "it": list(geoms) + list(reversed(paints)) + [tr(**t)]}

def rect(w, h, x=0, y=0, r=0, size=None):
    return {"ty": "rc", "p": prop([x, y]), "s": prop(size if size is not None else [w, h]), "r": prop(r)}

def ellipse(w, h, x=0, y=0, size=None, pos=None):
    return {"ty": "el", "p": prop(pos if pos is not None else [x, y]), "s": prop(size if size is not None else [w, h])}

def path(points, closed=False):
    """points: list of (x, y) or ('C', c1x, c1y, c2x, c2y, x, y) segments starting with a plain point."""
    v, i, o = [], [], []
    for p in points:
        if p[0] == "C":
            _, c1x, c1y, c2x, c2y, x, y = p
            o[-1] = [r2(c1x - v[-1][0]), r2(c1y - v[-1][1])]
            v.append([r2(x), r2(y)]); i.append([r2(c2x - x), r2(c2y - y)]); o.append([0, 0])
        else:
            v.append([r2(p[0]), r2(p[1])]); i.append([0, 0]); o.append([0, 0])
    if closed and len(v) > 1 and abs(v[0][0] - v[-1][0]) < 1e-6 and abs(v[0][1] - v[-1][1]) < 1e-6:
        # last point duplicates first: fold its in-tangent into the first vertex
        i[0] = i[-1]; v.pop(); i.pop(); o.pop()
    return {"ty": "sh", "ks": {"a": 0, "k": {"c": closed, "v": v, "i": i, "o": o}}}

def fill(c, opacity=None):
    if isinstance(c, ColorTrack):
        return {"ty": "fl", "c": c.rgb().json(), "o": prop(opacity if opacity is not None else c.alpha()), "r": 1}
    r, g, b, a = rgba(c)
    return {"ty": "fl", "c": {"a": 0, "k": [r4(r), r4(g), r4(b), 1]}, "o": prop(opacity if opacity is not None else a * 100), "r": 1}

def stroke(c, w, cap="butt", join="miter", opacity=None):
    lc = {"butt": 1, "round": 2, "square": 3}[cap]; lj = {"miter": 1, "round": 2, "bevel": 3}[join]
    if isinstance(c, ColorTrack):
        col, op = c.rgb().json(), prop(opacity if opacity is not None else c.alpha())
    else:
        r, g, b, a = rgba(c); col = {"a": 0, "k": [r4(r), r4(g), r4(b), 1]}; op = prop(opacity if opacity is not None else a * 100)
    return {"ty": "st", "c": col, "o": op, "w": prop(w), "lc": lc, "lj": lj, "ml": 4}

def gradient(kind, p0, p1, stops, stop_tracks=None):
    """stops: [(hex, pos 0..100)]. kind 'linear'|'radial'. stop_tracks: optional list of ColorTrack per stop (animated colours)."""
    n = len(stops)
    def flat(cols):
        cs = [rgba(c) for c in cols]
        k = []
        for (c, (_, p)) in zip(cs, stops): k += [r4(p / 100), r4(c[0]), r4(c[1]), r4(c[2])]
        if any(c[3] < 0.999 for c in cs) or stop_tracks:
            for (c, (_, p)) in zip(cs, stops): k += [r4(p / 100), r4(c[3])]
        return k
    if stop_tracks:
        frames = sorted({f for t in stop_tracks for f, _, _ in t.k})
        def col_at(t, f):
            last = None
            for kf, v, e in sorted(t.k, key=lambda x: x[0]):
                if kf <= f: last = v
            return last
        kfs = []
        for idx, f in enumerate(frames):
            cols = []
            for t in stop_tracks:
                v = col_at(t, f)
                cols.append("#%02x%02x%02x%02x" % tuple(round(x * 255) for x in (v[3], v[0], v[1], v[2])))
            kf = {"t": f, "s": flat(cols)}
            if idx < len(frames) - 1:
                ease = [e for t in stop_tracks for kf_, _, e in t.k if kf_ == f][0]
                if ease == HOLD:
                    # ThorVG (dotLottie) ignores "h" on gradient keys -> emit an explicit 1-frame step instead
                    kfs.append({**kf, "o": {"x": [0], "y": [0]}, "i": {"x": [1], "y": [1]}})
                    kf = {"t": frames[idx + 1] - 1, "s": flat(cols)}
                    kf["o"] = {"x": [0], "y": [0]}; kf["i"] = {"x": [1], "y": [1]}
                else:
                    (x1, y1), (x2, y2) = ease
                    kf["o"] = {"x": [x1], "y": [y1]}; kf["i"] = {"x": [x2], "y": [y2]}
            kfs.append(kf)
        gk = {"a": 1, "k": kfs}
    else:
        gk = {"a": 0, "k": flat([c for c, _ in stops])}
    return {"ty": "gf", "o": {"a": 0, "k": 100}, "r": 1, "t": 1 if kind == "linear" else 2,
            "s": prop(list(p0)), "e": prop(list(p1)), "h": {"a": 0, "k": 0}, "a": {"a": 0, "k": 0},
            "g": {"p": n, "k": gk}}

def trim(s, e, o=0, mode=2):
    return {"ty": "tm", "s": prop(s), "e": prop(e), "o": prop(o), "m": mode}

def soft_shadow(name, geom_fn, color, strength, steps=5, **t):
    """Fake Rive 'feather' with concentric copies. geom_fn(grow) -> geometry item."""
    r, g, b, a = rgba(color)
    items = []
    for k in range(steps):
        grow = strength * 0.7 * (k / (steps - 1) - 0.45)
        op = a * 100 / steps * 1.9
        items.append(shape_group(f"{name}{k}", [geom_fn(grow)], [fill("#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255)), opacity=op)]))
    return group(name, items, **t)

# ---------------------------------------------------------------- layers / comp
def shape_layer(name, items_bottom_to_top, op, ind, ks=None, masks=None, parent=None):
    L = {"ddd": 0, "ind": ind, "ty": 4, "nm": name, "sr": 1,
         "ks": ks or {"o": prop(100), "r": prop(0), "p": prop([0, 0, 0]), "a": prop([0, 0, 0]), "s": prop([100, 100, 100])},
         "ao": 0, "shapes": list(reversed(items_bottom_to_top)), "ip": 0, "op": op, "st": 0, "bm": 0}
    if masks: L["masksProperties"] = masks; L["hasMask"] = True
    if parent: L["parent"] = parent
    return L

def layer_ks(x=0, y=0, sx=100, sy=100, r=0, o=100):
    return {"o": prop(o), "r": prop(r), "p": prop([x, y, 0]), "a": prop([0, 0, 0]), "s": prop([sx, sy, 100])}

def rect_mask(x0, y0, x1, y1, name="clip"):
    v = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
    return {"inv": False, "mode": "a", "nm": name, "o": {"a": 0, "k": 100}, "x": {"a": 0, "k": 0},
            "pt": {"a": 0, "k": {"c": True, "v": [[r2(a), r2(b)] for a, b in v], "i": [[0, 0]] * 4, "o": [[0, 0]] * 4}}}

def comp(name, w, h, op, layers_bottom_to_top, markers=()):
    layers = list(reversed(layers_bottom_to_top))
    for i, L in enumerate(layers): L["ind"] = i + 1
    return {"v": "5.12.0", "fr": FPS, "ip": 0, "op": op, "w": w, "h": h, "nm": name, "ddd": 0, "assets": [],
            "layers": layers, "markers": [{"tm": a, "cm": n, "dr": b - a} for n, a, b in markers]}

def dump(obj, path):
    s = json.dumps(obj, separators=(",", ":"))
    open(path, "w").write(s)
    return len(s)
