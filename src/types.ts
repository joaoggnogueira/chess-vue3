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
  constructor(type: ChessPieceType, color: ChessPieceColor) {
    this.type = type
    this.color = color
  }
  toString() {
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
    }
    return types[this.type] + " " + colors[this.color]
  }
  getImage() {
    const images = {
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