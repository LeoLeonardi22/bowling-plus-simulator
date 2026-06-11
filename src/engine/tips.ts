import { TIPS } from '../data/tips';

let tipIndex = 0;

export function getNextTip(): string {
  const tip = TIPS[tipIndex % TIPS.length];
  tipIndex++;
  return tip;
}

export function resetTips(): void {
  tipIndex = 0;
}
