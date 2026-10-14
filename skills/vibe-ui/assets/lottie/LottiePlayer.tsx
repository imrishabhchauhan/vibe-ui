'use client';
// Vibe UI Lottie player for React, Next.js (App Router or Pages) and TanStack Start.
// Copy this file together with lottie-player.js and lottie-player.d.ts, then: pnpm add lottie-web
//
//   <LottiePlayer src="/lottie/success.json" width={240} height={240} intro="in" loop="idle" label="Payment complete" />
//
//   const ref = useRef<LottieHandle>(null);
//   <button aria-pressed={liked} onClick={() => { setLiked(!liked); ref.current?.play(liked ? 'off' : 'on'); }}>
//     <LottiePlayer ref={ref} src="/lottie/like.json" width={240} height={240} poster="off" autoplay={false} />
//     <span className="sr-only">Like</span>
//   </button>
//
// Keep this a small client leaf: the page or layout that renders it stays a server component.
import { forwardRef, useEffect, useImperativeHandle, useRef, type CSSProperties } from 'react';
import { mountLottie, type LottieController, type LottieOptions } from './lottie-player.js';

export type LottieHandle = Pick<LottieController, 'play' | 'poster'>;

type Props = Omit<LottieOptions, 'aspectRatio' | 'loadPlayer' | 'onReady'> & {
  /** Intrinsic size of the animation (the JSON's w/h). Reserves layout before load. */
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  onReady?: () => void;
};

const loadPlayer = () => import('lottie-web/build/player/lottie_light').then((m) => m.default);

export const LottiePlayer = forwardRef<LottieHandle, Props>(function LottiePlayer(
  { width, height, className, style, src, data, intro, loop, poster, label, autoplay, fit, onReady },
  ref,
) {
  const host = useRef<HTMLDivElement>(null);
  const ctl = useRef<LottieController | null>(null);

  useEffect(() => {
    if (!host.current) return;
    const controller = mountLottie(host.current, {
      src, data, intro, loop, poster, label, autoplay, fit, loadPlayer, onReady: () => onReady?.(),
    });
    ctl.current = controller;
    return () => { controller.destroy(); ctl.current = null; };
    // Re-mount only when the asset or its playback plan changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, data, intro, loop, poster, label, autoplay, fit]);

  useImperativeHandle(ref, () => ({
    play: (segment, looping) => ctl.current?.play(segment, looping),
    poster: () => ctl.current?.poster(),
  }), []);

  // With a slice fit the box is sized by CSS; otherwise reserve the animation's own aspect ratio.
  const box = fit?.includes('slice') ? style : { aspectRatio: `${width} / ${height}`, ...style };
  return <div ref={host} className={className} style={box} />;
});
