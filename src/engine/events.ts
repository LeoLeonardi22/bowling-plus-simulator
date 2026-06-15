import type { EventType, GameContext, GameEvent } from './types';

export function detectEvent(pins: number, context: GameContext): GameEvent {
  const { frameNumber, throwInFrame, streakStrike, hasHadStrike, hasHadSpare, recentGutter,
    lowSeriesCount, isPerfectGamePath, isSplit, pinsFirstThrow } = context;

  let type: EventType;

  if (frameNumber === 10) {
    if (throwInFrame === 1) {
      type = pins === 10 ? 'FRAME10_STRIKE' : 'FRAME10_START';
    } else if (throwInFrame === 2) {
      if (pinsFirstThrow === 10) {
        type = pins === 10 ? 'FRAME10_STRIKE2' : 'FRAME10_AFTER_STRIKE';
      } else {
        const isSpare = pinsFirstThrow + pins === 10;
        type = isSpare ? 'FRAME10_SPARE' : 'FRAME10_START';
      }
    } else {
      type = 'FRAME10_FINAL';
    }
    return { type, context, pins };
  }

  if (throwInFrame === 1) {
    if (pins === 10) {
      if (!hasHadStrike) type = 'STRIKE_FIRST';
      else if (isPerfectGamePath) type = 'PERFECT_GAME_PATH';
      else if (streakStrike >= 3) type = 'STRIKE_MULTI';
      else if (streakStrike === 2) type = 'STRIKE_TURKEY';
      else if (streakStrike === 1) type = 'STRIKE_DOUBLE';
      else if (lowSeriesCount >= 3) type = 'STRIKE_COMEBACK';
      else type = 'STRIKE_NORMAL';
    } else if (pins === 0) {
      type = recentGutter ? 'GUTTER_REPEATED' : 'GUTTER_FIRST';
    } else if (isSplit) {
      type = 'SPLIT';
    } else if (pins <= 3) {
      type = 'LOW_1_3';
    } else if (pins <= 6) {
      type = 'MEDIUM_4_6';
    } else {
      type = 'HIGH_7_9';
    }
  } else {
    const spare = pinsFirstThrow + pins === 10;
    if (spare) {
      if (!hasHadSpare) type = 'SPARE_FIRST';
      else if (pinsFirstThrow === 0) type = 'SPARE_AFTER_GUTTER';
      else if (context.prevFrameResult === 'spare') type = 'SPARE_CONSECUTIVE';
      else type = 'SPARE_NORMAL';
    } else if (pins === 0) {
      type = pinsFirstThrow === 0 ? 'GUTTER_AFTER_GUTTER' : 'MISSED_SPARE';
    } else {
      type = (lowSeriesCount >= 3 && pinsFirstThrow + pins < 5) ? 'LOW_SERIES' : 'OPEN_FRAME';
    }
  }

  return { type, context, pins };
}
