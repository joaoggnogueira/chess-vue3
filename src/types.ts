import uuid from 'uuid';

export enum ChessPieceType {
  Peao,
  Cavalo,
  Rainha,
  Rei,
  Torre,
  Bispo,
}

export enum ChessPieceColor {
  Uncolor = -1,
  Branca,
  Preta,
}

export class ChessPiece {
  color: ChessPieceColor
  type: ChessPieceType
  id: string
  constructor(type: ChessPieceType, color: ChessPieceColor) {
    this.type = type
    this.color = color
    this.id = uuid.v4()
  }
  toString():string {
    const types = {
      [ChessPieceType.Peao]: "peão",
      [ChessPieceType.Torre]: "torre",
      [ChessPieceType.Cavalo]: "cavalo",
      [ChessPieceType.Bispo]: "bispo",
      [ChessPieceType.Rei]: "rei",
      [ChessPieceType.Rainha]: "rainha",
    }
    const colors = {
      [ChessPieceColor.Branca]: "branca",
      [ChessPieceColor.Preta]: "preta",
      [ChessPieceColor.Uncolor]: "uncolor",
    }
    return types[this.type] + " " + colors[this.color]
  }
  getImage(): string {
    const images = {
      [ChessPieceColor.Uncolor]:{
        [ChessPieceType.Peao]: "peao_uncolor.svg",
        [ChessPieceType.Torre]: "torre_uncolor.svg",
        [ChessPieceType.Cavalo]: "cavalo_uncolor.svg",
        [ChessPieceType.Bispo]: "bispo_uncolor.svg",
        [ChessPieceType.Rei]: "rei_uncolor.svg",
        [ChessPieceType.Rainha]: "rainha_uncolor.svg",
      },
      [ChessPieceColor.Branca]: {
        [ChessPieceType.Peao]: "peao_branca.svg",
        [ChessPieceType.Torre]: "torre_branca.svg",
        [ChessPieceType.Cavalo]: "cavalo_branca.svg",
        [ChessPieceType.Bispo]: "bispo_branca.svg",
        [ChessPieceType.Rei]: "rei_branca.svg",
        [ChessPieceType.Rainha]: "rainha_branca.svg",
      },
      [ChessPieceColor.Preta]: {
        [ChessPieceType.Peao]: "peao_preta.svg",
        [ChessPieceType.Torre]: "torre_preta.svg",
        [ChessPieceType.Cavalo]: "cavalo_preta.svg",
        [ChessPieceType.Bispo]: "bispo_preta.svg",
        [ChessPieceType.Rei]: "rei_preta.svg",
        [ChessPieceType.Rainha]: "rainha_preta.svg",
      },
    }
    return images[this.color][this.type]
  }
}

export type ChessSlot = {
  piece: ChessPiece | null
  move: ChessPiece | null
  row: number
  col: number
  hasMove: boolean
}

export type ChessMoveOptions = {
  can_eat?: boolean
  only_eat?: boolean
  slots?: Array<Array<ChessSlot>>
}

export type ActionTreeFunction = (arow: number, acol: number, piece: ChessPiece) => boolean

export interface MovePiece{
  row: number;
  col: number;
};