'use client';
// Scripted cursor for live demos. Position it inside a `position: relative` stage and pass `useLiveDemo().cursorRef`.
// Styling uses inline styles + data attributes so it works with or without Tailwind.
import { forwardRef, type CSSProperties } from 'react';

const base: CSSProperties = {
  position: 'absolute', left: 0, top: 0, width: 22, height: 22, zIndex: 20, pointerEvents: 'none',
  willChange: 'transform', filter: 'drop-shadow(0 1px 1.5px rgba(0,0,0,.3))', transition: 'opacity .25s',
};

export const DemoCursor = forwardRef<HTMLDivElement, { className?: string }>(function DemoCursor({ className }, ref) {
  return (
    <div ref={ref} aria-hidden="true" className={['demo-cursor', className].filter(Boolean).join(' ')} style={base}>
      <style>{`.demo-cursor{opacity:0}.demo-cursor[data-on]{opacity:1}.demo-cursor svg{transform-origin:3px 2px;transition:transform .12s cubic-bezier(.16,1,.3,1)}.demo-cursor[data-press] svg{transform:scale(.86)}@media (prefers-reduced-motion: reduce){.demo-cursor{display:none}}`}</style>
      <svg viewBox="0 0 22 22" width="22" height="22">
        <path d="M3 2.2v15.6l4.3-4.1 2.7 6.1 2.6-1.1-2.7-6h6.1z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
});
