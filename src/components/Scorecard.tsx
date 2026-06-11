import type { Frame } from '../engine/types';

interface Props { frames: Frame[]; }

function symbol(throws: number[], idx: number, frameIdx: number): string {
  const v = throws[idx];
  if (v === undefined) return '';
  if (frameIdx < 9) {
    if (idx === 0 && v === 10) return 'X';
    if (idx === 1 && throws[0] + v === 10) return '/';
    if (v === 0) return '-';
    return String(v);
  } else {
    if (v === 10) return 'X';
    if (idx === 1 && throws[0] !== 10 && throws[0] + v === 10) return '/';
    if (idx === 2 && throws[1] !== 10 && (throws[0] === 10 ? v === 10 : throws[1] + v === 10)) return '/';
    if (v === 0) return '-';
    return String(v);
  }
}

export default function Scorecard({ frames }: Props) {
  return (
    <div className="scorecard">
      <div className="sc-header">
        <div className="sc-name">Player</div>
        {frames.map((f, i) => (
          <div key={i} className={`sc-frame-hdr ${i === 9 ? 'frame10' : ''}`}>{f.frameNumber}</div>
        ))}
        <div className="sc-total-hdr">TOTAL</div>
      </div>

      <div className="sc-row">
        <div className="sc-name-cell">—</div>
        {frames.map((f, fi) => (
          <div key={fi} className={`sc-frame ${fi === 9 ? 'frame10' : ''}`}>
            <div className="sc-rolls">
              {fi === 9
                ? [0, 1, 2].map(i => <span key={i} className="sc-roll">{symbol(f.throws, i, fi)}</span>)
                : f.isStrike
                  ? <><span className="sc-roll" /><span className="sc-roll strike">X</span></>
                  : [0, 1].map(i => <span key={i} className="sc-roll">{symbol(f.throws, i, fi)}</span>)
              }
            </div>
            <div className="sc-score">{f.cumulative ?? ''}</div>
          </div>
        ))}
        <div className="sc-total">{frames[9]?.cumulative ?? 0}</div>
      </div>
    </div>
  );
}
