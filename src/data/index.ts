import type { LevelData } from '../types'
import { levels1to10 } from './levels1-10'
import { levels11to20 } from './levels11-20'
import { levels21to30 } from './levels21-30'

export const allLevels: LevelData[] = [...levels1to10, ...levels11to20, ...levels21to30]

export const MAX_LEVEL = allLevels.length

export function getLevel(level: number): LevelData {
  const clamped = Math.min(Math.max(level, 1), MAX_LEVEL)
  return allLevels[clamped - 1]
}
