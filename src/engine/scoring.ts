import type { Frame } from './types';

export function calculateFrameScores(throws: number[]): (number | null)[] {
  const scores: (number | null)[] = new Array(10).fill(null);
  let i = 0;

  for (let f = 0; f < 10; f++) {
    if (i >= throws.length) break;

    if (f === 9) {
      const t1 = throws[i];
      const t2 = throws[i + 1];
      const t3 = throws[i + 2];
      if (t1 === undefined) break;
      if (t1 === 10) {
        if (t2 === undefined || t3 === undefined) break;
        scores[9] = t1 + t2 + t3;
      } else if (t2 !== undefined && t1 + t2 === 10) {
        if (t3 === undefined) break;
        scores[9] = t1 + t2 + t3;
      } else {
        if (t2 === undefined) break;
        scores[9] = t1 + t2;
      }
    } else if (throws[i] === 10) {
      const b1 = throws[i + 1];
      const b2 = throws[i + 2];
      if (b1 === undefined || b2 === undefined) break;
      scores[f] = 10 + b1 + b2;
      i += 1;
      continue;
    } else {
      const t1 = throws[i];
      const t2 = throws[i + 1];
      if (t2 === undefined) break;
      if (t1 + t2 === 10) {
        const b1 = throws[i + 2];
        if (b1 === undefined) break;
        scores[f] = 10 + b1;
      } else {
        scores[f] = t1 + t2;
      }
      i += 2;
      continue;
    }
    i += throws[i] === 10 ? 1 : 2;
  }

  return scores;
}

export function getCumulativeScores(frameScores: (number | null)[]): (number | null)[] {
  const cumulative: (number | null)[] = [];
  let total = 0;
  for (const s of frameScores) {
    if (s === null) { cumulative.push(null); }
    else { total += s; cumulative.push(total); }
  }
  return cumulative;
}

export function buildFrames(throws: number[]): Frame[] {
  const frameScores = calculateFrameScores(throws);
  const cumulative = getCumulativeScores(frameScores);
  const frames: Frame[] = [];
  let i = 0;

  for (let f = 0; f < 10; f++) {
    if (f === 9) {
      const t1 = throws[i];
      const t2 = throws[i + 1];
      const t3 = throws[i + 2];
      const frameThrows = [t1, t2, t3].filter(t => t !== undefined) as number[];
      const isStrike = t1 === 10;
      const isSpare = !isStrike && t1 !== undefined && t2 !== undefined && t1 + t2 === 10;
      const needed = isStrike ? 3 : isSpare ? 3 : 2;
      frames.push({
        frameNumber: 10,
        throws: frameThrows,
        score: frameScores[9],
        cumulative: cumulative[9],
        isStrike,
        isSpare,
        isComplete: frameThrows.length >= needed,
      });
    } else if (throws[i] === 10) {
      frames.push({
        frameNumber: f + 1,
        throws: [10],
        score: frameScores[f],
        cumulative: cumulative[f],
        isStrike: true,
        isSpare: false,
        isComplete: true,
      });
      i += 1;
      continue;
    } else {
      const t1 = throws[i];
      const t2 = throws[i + 1];
      if (t1 === undefined) {
        frames.push({ frameNumber: f + 1, throws: [], score: null, cumulative: null, isStrike: false, isSpare: false, isComplete: false });
        continue;
      }
      const frameThrows = t2 !== undefined ? [t1, t2] : [t1];
      const isSpare = t2 !== undefined && t1 + t2 === 10;
      frames.push({
        frameNumber: f + 1,
        throws: frameThrows,
        score: frameScores[f],
        cumulative: cumulative[f],
        isStrike: false,
        isSpare,
        isComplete: t2 !== undefined,
      });
      i += 2;
      continue;
    }
    i += (throws[i] === 10) ? 1 : 2;
  }

  while (frames.length < 10) {
    frames.push({ frameNumber: frames.length + 1, throws: [], score: null, cumulative: null, isStrike: false, isSpare: false, isComplete: false });
  }

  return frames;
}

export function isGameOver(throws: number[]): boolean {
  const frames = buildFrames(throws);
  const f10 = frames[9];
  if (!f10.isComplete) return false;
  return true;
}

export function maxPinsSecondThrow(firstThrow: number): number {
  return 10 - firstThrow;
}
