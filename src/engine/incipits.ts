import { INCIPITS } from '../data/incipits';
import type { FrameResult } from './types';

let incipitIndex = 0;

export function getIncipit(prevResult: FrameResult | null, nextFrame: number): string {
  const category = prevResult === 'strike' ? 'strike'
    : prevResult === 'spare' ? 'spare'
    : 'open';
  const variants = INCIPITS[category];
  const text = variants[incipitIndex % variants.length](nextFrame);
  incipitIndex++;
  return text;
}

export function resetIncipits(): void {
  incipitIndex = 0;
}
