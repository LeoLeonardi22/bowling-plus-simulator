import { TIPS } from '../data/tips';

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

let shuffledTips = shuffle(TIPS);
let tipIndex = 0;

export function getNextTip(): string {
  const tip = shuffledTips[tipIndex % shuffledTips.length];
  tipIndex++;
  return tip;
}

export function resetTips(): void {
  shuffledTips = shuffle(TIPS);
  tipIndex = 0;
}
