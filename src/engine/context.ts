import type { GameContext, GamePhase, Frame } from './types';

export function buildContext(
  frames: Frame[],
  currentFrame: number,
  throwInFrame: number,
  isSplit: boolean,
  pinsFirstThrow: number
): GameContext {
  const phase: GamePhase =
    currentFrame <= 3 ? 'early' : currentFrame <= 7 ? 'mid' : 'late';

  const completedFrames = frames.filter(f => f.isComplete && f.frameNumber < currentFrame);

  let streakStrike = 0;
  let streakSpare = 0;
  let hasHadStrike = false;
  let hasHadSpare = false;
  let lowSeriesCount = 0;
  let prevFrameResult: GameContext['prevFrameResult'] = null;
  let consecutiveLow = 0;

  for (const f of completedFrames) {
    if (f.isStrike) {
      hasHadStrike = true;
      streakStrike++;
      streakSpare = 0;
      consecutiveLow = 0;
    } else if (f.isSpare) {
      hasHadSpare = true;
      streakSpare++;
      streakStrike = 0;
      consecutiveLow = 0;
    } else {
      streakStrike = 0;
      streakSpare = 0;
      const total = f.throws.reduce((a, b) => a + b, 0);
      if (total < 5) consecutiveLow++;
      else consecutiveLow = 0;
    }
    prevFrameResult = f.isStrike ? 'strike' : f.isSpare ? 'spare' : 'open';
  }

  lowSeriesCount = consecutiveLow;

  const isPerfectGamePath =
    currentFrame >= 7 &&
    completedFrames.filter(f => f.frameNumber >= 1).every(f => f.isStrike);

  return {
    frameNumber: currentFrame,
    throwInFrame,
    phase,
    streakStrike,
    streakSpare,
    hasHadStrike,
    hasHadSpare,
    lowSeriesCount,
    isPerfectGamePath,
    prevFrameResult,
    isSplit,
    pinsFirstThrow,
  };
}
