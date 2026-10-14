export interface LottieOptions {
  src?: string;
  data?: { w: number; h: number; markers?: { cm: string; tm: number; dr?: number }[] } & Record<string, unknown>;
  intro?: string;
  loop?: string | boolean;
  poster?: number | string;
  label?: string;
  /** SVG preserveAspectRatio, e.g. 'xMidYMax slice' to fill a CSS-sized box. Default 'xMidYMid meet'. */
  fit?: string;
  autoplay?: boolean;
  aspectRatio?: string;
  loadPlayer?: () => Promise<unknown>;
  playerUrl?: string;
  onReady?: (controller: LottieController) => void;
}

export interface LottieController {
  play(segment: string | true, loop?: boolean): void;
  poster(): void;
  readonly segments: Record<string, [number, number]>;
  readonly animation: unknown;
  destroy(): void;
}

export function mountLottie(el: HTMLElement, options?: LottieOptions): LottieController;
