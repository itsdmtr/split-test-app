import { nanoid } from 'nanoid';
import type { Variant } from '@/types';

export function selectVariant(variants: Variant[], seed?: string): number {
  const random = seed ? hashToRandom(seed) : Math.random();

  // Convert random [0,1) to percentage [0,100)
  const randomPercentage = random * 100;

  // Find which variant range this falls into
  let cumulativeWeight = 0;
  for (let i = 0; i < variants.length; i++) {
    cumulativeWeight += variants[i].weight;
    if (randomPercentage < cumulativeWeight) {
      return i;
    }
  }

  // Fallback to last variant (shouldn't happen if weights sum to 100)
  return variants.length - 1;
}

function hashToRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647;
}

export function generateSessionId(): string {
  return nanoid(16);
}

// Helper to calculate equal distribution percentages
export function calculateEqualWeights(count: number): number[] {
  const baseWeight = Math.floor(100 / count);
  const remainder = 100 - (baseWeight * count);

  const weights = Array(count).fill(baseWeight);
  // Distribute remainder to first variants
  for (let i = 0; i < remainder; i++) {
    weights[i]++;
  }

  return weights;
}
