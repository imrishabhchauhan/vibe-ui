'use client';
// Example: a live "drop a file -> upload -> done" demo built the React way with useLiveDemo + DemoCursor.
// In a real project, replace the plain elements with the project's own components (Button, Progress, Badge) and
// its Tailwind tokens or CSS variables; keep the structure: state-driven UI, script changes state, cursor via refs.
import { useRef, useState } from 'react';
import { useLiveDemo } from './useLiveDemo';
import { DemoCursor } from './DemoCursor';

type Phase = 'idle' | 'over' | 'uploading' | 'done';
const FILE = { name: 'Discovery-call-Acme.m4a', size: 38.2 };

export function UploadDemo() {
  const stage = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [mb, setMb] = useState(0);

  const { cursorRef } = useLiveDemo(stage, async (d) => {
    await d.sleep(600);
    d.cursor.show();
    await d.cursor.moveTo(drop.current, { ay: 0.55 });
    setPhase('over');
    await d.sleep(600);
    await d.cursor.press();
    setPhase('uploading');
    d.cursor.show(false);
    await d.count(0, FILE.size, 2600, setMb);
    setPhase('done');
    await d.sleep(2600);
  }, {
    onReset: () => { setPhase('idle'); setMb(0); },
    onReduced: () => { setPhase('done'); setMb(FILE.size); },
  });

  const pct = (mb / FILE.size) * 100;
  return (
    <div ref={stage} role="img" aria-label={`A call recording, ${FILE.name}, is dropped in and uploads to 100 percent.`}
      style={{ position: 'relative', height: 300, padding: 32, borderRadius: 20, background: 'var(--muted, #F5F5F6)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 400, margin: '0 auto', borderRadius: 14, background: 'var(--card, #fff)', border: '1px solid var(--border, #E6E6E9)' }}>
        <div ref={drop} style={{
          margin: 6, padding: '22px 16px', textAlign: 'center', borderRadius: 11, transition: 'background-color .25s, border-color .25s',
          border: `1.5px ${phase === 'over' ? 'solid' : 'dashed'} ${phase === 'over' ? 'var(--primary, #1A81D2)' : 'var(--border, #D9D9DE)'}`,
          background: phase === 'over' ? 'color-mix(in srgb, var(--primary, #1A81D2) 10%, transparent)' : 'transparent',
        }}>
          {phase === 'over' ? 'Release to analyze 1 call' : 'Drop a call recording or browse'}
        </div>
        {phase !== 'idle' && phase !== 'over' && (
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border, #E6E6E9)', fontVariantNumeric: 'tabular-nums' }}>
            <div style={{ fontWeight: 500 }}>{FILE.name}{phase === 'done' ? ' ✓' : ''}</div>
            <div style={{ fontSize: 12.5, opacity: 0.7 }}>{phase === 'done' ? 'Uploaded' : `${mb.toFixed(1)} of ${FILE.size} MB`}</div>
            <div style={{ height: 3, marginTop: 6, borderRadius: 3, background: 'var(--border, #EDEDF0)' }}>
              <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: 'currentColor' }} />
            </div>
          </div>
        )}
      </div>
      <DemoCursor ref={cursorRef} />
    </div>
  );
}
