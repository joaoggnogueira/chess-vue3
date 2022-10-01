import type { ChessSlot } from "./types";

export function atBound(matriz: Array<Array<ChessSlot>>, row: number, col: number): boolean {
  return !!(matriz[row] && matriz[row][col])
}
