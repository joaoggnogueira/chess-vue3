<script lang="ts">
import Slot from "./Slot.vue"
import Piece from "./Piece.vue"
import Dialog from "@/components/Dialog.vue"

import { ChessPiece, ChessPieceColor, ChessPieceType } from "@/types"
import type { ChessMoveOptions, ChessSlot, ActionTreeFunction } from "@/types"

import { atBound } from "@/utils"
import { defineComponent } from "vue"

function c(a: ChessPieceType, b: ChessPieceColor) {
  return new ChessPiece(a, b)
}

const { Torre, Cavalo, Bispo, Rei, Rainha, Peao } = ChessPieceType
const { Preta, Branca } = ChessPieceColor

export default defineComponent({
  created() {
    this.test()
  },
  components: {
    Slot,
    Piece,
    Dialog,
  },
  data: () => ({
    Preta: Preta as Readonly<ChessPieceColor>,
    Branca: Branca as Readonly<ChessPieceColor>,
    Torre: Torre as Readonly<ChessPieceType>,
    Cavalo: Cavalo as Readonly<ChessPieceType>,
    Bispo: Bispo as Readonly<ChessPieceType>,
    Rei: Rei as Readonly<ChessPieceType>,
    Rainha: Rainha as Readonly<ChessPieceType>,
    Peao: Peao as Readonly<ChessPieceType>,
    turn: Branca as ChessPieceColor,
    RainhaEmPerigo: false as boolean,
    promotionDialog: null as ChessPiece | null,
    promotionPiecesPreta: [
      c(Torre, Preta),
      c(Cavalo, Preta),
      c(Bispo, Preta),
      c(Rei, Preta),
    ] as Array<ChessPiece>,
    promotionPiecesbranca: [
      c(Torre, Branca),
      c(Cavalo, Branca),
      c(Bispo, Branca),
      c(Rei, Branca),
    ] as Array<ChessPiece>,
    cemiterioBranca: [] as Array<ChessPiece>,
    cemiterioPreta: [] as Array<ChessPiece>,
    slots: [
      [
        { piece: c(Torre, Preta), move: null, row: 0, col: 0, hasMove: false },
        { piece: c(Cavalo, Preta), move: null, row: 0, col: 1, hasMove: false },
        { piece: c(Bispo, Preta), move: null, row: 0, col: 2, hasMove: false },
        { piece: c(Rei, Preta), move: null, row: 0, col: 3, hasMove: false },
        { piece: c(Rainha, Preta), move: null, row: 0, col: 4, hasMove: false },
        { piece: c(Bispo, Preta), move: null, row: 0, col: 5, hasMove: false },
        { piece: c(Cavalo, Preta), move: null, row: 0, col: 6, hasMove: false },
        { piece: c(Torre, Preta), move: null, row: 0, col: 7, hasMove: false },
      ],
      [
        { piece: c(Peao, Preta), move: null, row: 1, col: 0, hasMove: false },
        { piece: c(Peao, Preta), move: null, row: 1, col: 1, hasMove: false },
        { piece: c(Peao, Preta), move: null, row: 1, col: 2, hasMove: false },
        { piece: c(Peao, Preta), move: null, row: 1, col: 3, hasMove: false },
        { piece: c(Peao, Preta), move: null, row: 1, col: 4, hasMove: false },
        { piece: c(Peao, Preta), move: null, row: 1, col: 5, hasMove: false },
        { piece: c(Peao, Preta), move: null, row: 1, col: 6, hasMove: false },
        { piece: c(Peao, Preta), move: null, row: 1, col: 7, hasMove: false },
      ],
      [
        { piece: null, move: null, row: 2, col: 0, hasMove: false },
        { piece: null, move: null, row: 2, col: 1, hasMove: false },
        { piece: null, move: null, row: 2, col: 2, hasMove: false },
        { piece: null, move: null, row: 2, col: 3, hasMove: false },
        { piece: null, move: null, row: 2, col: 4, hasMove: false },
        { piece: null, move: null, row: 2, col: 5, hasMove: false },
        { piece: null, move: null, row: 2, col: 6, hasMove: false },
        { piece: null, move: null, row: 2, col: 7, hasMove: false },
      ],
      [
        { piece: null, move: null, row: 3, col: 0, hasMove: false },
        { piece: null, move: null, row: 3, col: 1, hasMove: false },
        { piece: null, move: null, row: 3, col: 2, hasMove: false },
        { piece: null, move: null, row: 3, col: 3, hasMove: false },
        { piece: null, move: null, row: 3, col: 4, hasMove: false },
        { piece: null, move: null, row: 3, col: 5, hasMove: false },
        { piece: null, move: null, row: 3, col: 6, hasMove: false },
        { piece: null, move: null, row: 3, col: 7, hasMove: false },
      ],
      [
        { piece: null, move: null, row: 4, col: 0, hasMove: false },
        { piece: null, move: null, row: 4, col: 1, hasMove: false },
        { piece: null, move: null, row: 4, col: 2, hasMove: false },
        { piece: null, move: null, row: 4, col: 3, hasMove: false },
        { piece: null, move: null, row: 4, col: 4, hasMove: false },
        { piece: null, move: null, row: 4, col: 5, hasMove: false },
        { piece: null, move: null, row: 4, col: 6, hasMove: false },
        { piece: null, move: null, row: 4, col: 7, hasMove: false },
      ],
      [
        { piece: null, move: null, row: 5, col: 0, hasMove: false },
        { piece: null, move: null, row: 5, col: 1, hasMove: false },
        { piece: null, move: null, row: 5, col: 2, hasMove: false },
        { piece: null, move: null, row: 5, col: 3, hasMove: false },
        { piece: null, move: null, row: 5, col: 4, hasMove: false },
        { piece: null, move: null, row: 5, col: 5, hasMove: false },
        { piece: null, move: null, row: 5, col: 6, hasMove: false },
        { piece: null, move: null, row: 5, col: 7, hasMove: false },
      ],
      [
        { piece: c(Peao, Branca), move: null, row: 6, col: 0, hasMove: false },
        { piece: c(Peao, Branca), move: null, row: 6, col: 1, hasMove: false },
        { piece: c(Peao, Branca), move: null, row: 6, col: 2, hasMove: false },
        { piece: c(Peao, Branca), move: null, row: 6, col: 3, hasMove: false },
        { piece: c(Peao, Branca), move: null, row: 6, col: 4, hasMove: false },
        { piece: c(Peao, Branca), move: null, row: 6, col: 5, hasMove: false },
        { piece: c(Peao, Branca), move: null, row: 6, col: 6, hasMove: false },
        { piece: c(Peao, Branca), move: null, row: 6, col: 7, hasMove: false },
      ],
      [
        { piece: c(Torre, Branca), move: null, row: 7, col: 0, hasMove: false },
        { piece: c(Cavalo, Branca), move: null, row: 7, col: 1, hasMove: false },
        { piece: c(Bispo, Branca), move: null, row: 7, col: 2, hasMove: false },
        { piece: c(Rei, Branca), move: null, row: 7, col: 3, hasMove: false },
        { piece: c(Rainha, Branca), move: null, row: 7, col: 4, hasMove: false },
        { piece: c(Bispo, Branca), move: null, row: 7, col: 5, hasMove: false },
        { piece: c(Cavalo, Branca), move: null, row: 7, col: 6, hasMove: false },
        { piece: c(Torre, Branca), move: null, row: 7, col: 7, hasMove: false },
      ],
    ] as Array<Array<ChessSlot>>,
    selected: null as ChessSlot | null,
  }),

  methods: {
    movePiece(row: number, col: number) {
      if (atBound(this.slots, row, col) && this.selected) {
        const slot = this.slots[row][col]
        if (slot.piece) {
          if (this.turn == Preta) {
            this.cemiterioBranca.push(slot.piece)
          } else {
            this.cemiterioPreta.push(slot.piece)
          }
        }
        this.slots[row][col].piece = this.selected.piece
        this.selected.piece = null
        this.selected = null
        this.clearMoveOptions()
        if (this.turn == Preta) {
          if (row == 7 && this.slots[row][col].piece?.type == Peao) {
            this.promotionDialog = this.slots[row][col].piece
            return
          }
        } else {
          if (row == 0 && this.slots[row][col].piece?.type == Peao) {
            this.promotionDialog = this.slots[row][col].piece
            return
          }
        }
        this.nextTurn()
      }
    },
    testMoveOption(
      slots: Array<Array<ChessSlot>>,
      slotOrigin: ChessSlot,
      row: number,
      col: number,
      action: ActionTreeFunction,
      options?: ChessMoveOptions
    ): boolean {
      const { can_eat, only_eat } = options || {}
      let result: boolean = false
      if (slotOrigin?.piece) {
        const selectedpiece = slotOrigin.piece
        if (atBound(slots, row, col)) {
          if (slots[row][col].piece?.color == selectedpiece.color) {
            return false
          }
          if (slots[row][col].piece) {
            if (can_eat || only_eat) {
              result = action(row, col, selectedpiece)
            }
          } else {
            if (!only_eat) {
              result = action(row, col, selectedpiece)
            }
          }
          return result
        }
      }
      return false
    },
    getAllSlotsOfColor(slots: Array<Array<ChessSlot>>, color: ChessPieceColor): Array<ChessSlot> {
      return slots.reduce((acc, d) => acc.concat(d), []).filter((d) => d.piece?.color == color)
    },
    clearMoveOptions() {
      const slots = this.flatSlots
      slots.forEach((d) => {
        d.move = null
      })
    },
    clearHasMove() {
      const slots = this.flatSlots
      slots.forEach((d) => {
        d.hasMove = false
      })
    },
    hasPieceOn(row: number, col: number) {
      if (atBound(this.slots, row, col)) {
        return !!this.slots[row + 1][col].piece
      }
      return false
    },
    pushPeaoMoveOptions(
      slots: Array<Array<ChessSlot>>,
      slot: ChessSlot,
      action: ActionTreeFunction
    ): boolean {
      if (!slot.piece) {
        return false
      }
      const { row, col, piece } = slot
      let result: boolean = false
      if (piece.color == Preta) {
        result =
          this.testMoveOption(slots, slot, row + 1, col + 1, action, { only_eat: true }) || result
        result =
          this.testMoveOption(slots, slot, row + 1, col - 1, action, { only_eat: true }) || result

        if (this.testMoveOption(slots, slot, row + 1, col, action)) {
          result = true
          if (row < 3) {
            this.testMoveOption(slots, slot, row + 2, col, action)
          }
        }
      } else if (piece.color == Branca) {
        result =
          this.testMoveOption(slots, slot, row - 1, col + 1, action, { only_eat: true }) || result
        result =
          this.testMoveOption(slots, slot, row - 1, col - 1, action, { only_eat: true }) || result

        if (this.testMoveOption(slots, slot, row - 1, col, action)) {
          result = true
          if (row > 5) {
            this.testMoveOption(slots, slot, row - 2, col, action)
          }
        }
      }
      return result
    },
    pushTorreMoveOptions(
      slots: Array<Array<ChessSlot>>,
      slot: ChessSlot,
      action: ActionTreeFunction
    ): boolean {
      if (!slot.piece) {
        return false
      }
      const { row, col } = slot
      let toRight: number = 1
      let toLeft: number = 1
      let toTop: number = 1
      let toBottom: number = 1
      let result: boolean = false

      while (this.testMoveOption(slots, slot, row + toRight, col, action, { can_eat: true })) {
        result = true
        toRight++
      }
      while (this.testMoveOption(slots, slot, row - toLeft, col, action, { can_eat: true })) {
        result = true
        toLeft++
      }
      while (this.testMoveOption(slots, slot, row, col - toTop, action, { can_eat: true })) {
        result = true
        toTop++
      }
      while (this.testMoveOption(slots, slot, row, col + toBottom, action, { can_eat: true })) {
        result = true
        toBottom++
      }
      return result
    },
    pushCavaloMoveOptions(
      slots: Array<Array<ChessSlot>>,
      slot: ChessSlot,
      action: ActionTreeFunction
    ): boolean {
      if (!slot.piece) {
        return false
      }
      const { row, col } = slot
      let result: boolean = false
      result =
        this.testMoveOption(slots, slot, row + 1, col + 2, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row + 2, col + 1, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row - 1, col + 2, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row - 2, col + 1, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row + 1, col - 2, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row + 2, col - 1, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row - 1, col - 2, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row - 2, col - 1, action, { can_eat: true }) || result
      return result
    },
    pushBispoMoveOptions(
      slots: Array<Array<ChessSlot>>,
      slot: ChessSlot,
      action: ActionTreeFunction
    ): boolean {
      if (!slot.piece) {
        return false
      }
      const { row, col } = slot
      let result: boolean = false
      let i: number = 1
      while (this.testMoveOption(slots, slot, row + i, col + i, action, { can_eat: true })) {
        result = true
        i++
      }
      i = 1
      while (this.testMoveOption(slots, slot, row + i, col - i, action, { can_eat: true })) {
        result = true
        i++
      }
      i = 1
      while (this.testMoveOption(slots, slot, row - i, col + i, action, { can_eat: true })) {
        result = true
        i++
      }
      i = 1
      while (this.testMoveOption(slots, slot, row - i, col - i, action, { can_eat: true })) {
        result = true
        i++
      }
      return result
    },
    pushReiMoveOptions(
      slots: Array<Array<ChessSlot>>,
      slot: ChessSlot,
      action: ActionTreeFunction
    ): boolean {
      let result = false
      result = this.pushTorreMoveOptions(slots, slot, action) || result
      result = this.pushBispoMoveOptions(slots, slot, action) || result
      return result
    },
    pushRainhaMoveOptions(
      slots: Array<Array<ChessSlot>>,
      slot: ChessSlot,
      action: ActionTreeFunction
    ): boolean {
      if (!slot.piece) {
        return false
      }
      const { row, col } = slot
      let result = false
      result =
        this.testMoveOption(slots, slot, row + 1, col + 1, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row + 1, col - 1, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row - 1, col + 1, action, { can_eat: true }) || result
      result =
        this.testMoveOption(slots, slot, row - 1, col - 1, action, { can_eat: true }) || result

      result = this.testMoveOption(slots, slot, row + 1, col, action, { can_eat: true }) || result
      result = this.testMoveOption(slots, slot, row - 1, col, action, { can_eat: true }) || result
      result = this.testMoveOption(slots, slot, row, col + 1, action, { can_eat: true }) || result
      result = this.testMoveOption(slots, slot, row, col - 1, action, { can_eat: true }) || result
      return result
    },
    test() {
      this.clearHasMove()
      this.RainhaEmPerigo = false
      const cloned = this.slots
      const rivalcolor = this.turn == Branca ? Preta : Branca
      let isOnDanger: boolean = false
      const action = (arow: number, acol: number, chesspiece: ChessPiece) => {
        const piece = cloned[arow][acol].piece
        if (piece && piece.type === Rainha && piece.color === this.turn) {
          console.log(`A rainha est?? exposta para ${chesspiece.toString()}`)
          isOnDanger = true
        }
        return !cloned[arow][acol].piece
      }

      const rivalslots = this.getAllSlotsOfColor(cloned, rivalcolor)
      for (let slot of rivalslots) {
        if (slot.piece) {
          this.switchMovement(cloned, slot, action)
          if (isOnDanger) {
            break
          }
        }
      }

      const turnslots = this.getAllSlotsOfColor(cloned, this.turn)
      for (let slot of turnslots) {
        if (slot.piece) {
          slot.hasMove = this.switchMovement(cloned, slot, (arow: number, acol: number) => {
            const danger = this.moveRainhaEmPerigo(arow, acol, slot)
            if (!danger) {
              return (
                !this.slots[arow][acol].piece || this.slots[arow][acol].piece?.color != this.turn
              )
            }
            return false
          })
        }
      }
      if (turnslots.every((slot) => !slot.hasMove)) {
        alert("CheckMate")
      }
      this.RainhaEmPerigo = isOnDanger
    },
    moveRainhaEmPerigo(row: number, col: number, slot: ChessSlot): boolean {
      if (slot && slot.piece) {
        const cloned = this.cloneSlots(this.slots)
        cloned[row][col].piece = slot.piece
        cloned[slot.row][slot.col].piece = null
        const rivalcolor = slot.piece.color == Branca ? Preta : Branca
        let isOnDanger: boolean = false
        const action = (arow: number, acol: number, chesspiece: ChessPiece) => {
          const piece = cloned[arow][acol].piece
          if (piece && piece.type === Rainha && piece.color === this.turn) {
            isOnDanger = true
          }
          return !cloned[arow][acol].piece
        }

        const rivalslots = this.getAllSlotsOfColor(cloned, rivalcolor)
        for (let slot of rivalslots) {
          if (slot.piece) {
            this.switchMovement(cloned, slot, action)
            if (isOnDanger) {
              return true
            }
          }
        }
      }
      return false
    },
    switchMovement(
      slots: Array<Array<ChessSlot>>,
      slot: ChessSlot,
      action: ActionTreeFunction
    ): boolean {
      switch (slot.piece?.type) {
        case Peao:
          return this.pushPeaoMoveOptions(slots, slot, action)
        case Torre:
          return this.pushTorreMoveOptions(slots, slot, action)
        case Cavalo:
          return this.pushCavaloMoveOptions(slots, slot, action)
        case Bispo:
          return this.pushBispoMoveOptions(slots, slot, action)
        case Rei:
          return this.pushReiMoveOptions(slots, slot, action)
        case Rainha:
          return this.pushRainhaMoveOptions(slots, slot, action)
      }
      return false
    },
    selectedPiece(slot: ChessSlot) {
      if (slot.piece) {
        this.selected = slot
        this.clearMoveOptions()
        const action = (row: number, col: number) => {
          const danger = this.moveRainhaEmPerigo(row, col, slot)
          if (!danger) {
            this.slots[row][col].move = slot.piece
            return !this.slots[row][col].piece
          }
          return false
        }
        this.switchMovement(this.cloneSlots(this.slots), slot, action)
      }
    },
    cloneSlots(slots: Array<Array<ChessSlot>>): Array<Array<ChessSlot>> {
      return slots.map((rows) => rows.map((d) => ({ ...d })))
    },
    promoteTo(type: ChessPieceType) {
      if (this.promotionDialog) {
        this.promotionDialog.type = type
        this.promotionDialog = null
        this.nextTurn()
      }
    },
    nextTurn() {
      this.turn = this.turn == Preta ? Branca : Preta
      this.test()
    },
  },
  computed: {
    flatSlots(): Array<ChessSlot> {
      return this.slots.reduce((acc, d) => acc.concat(d), [])
    },
    promotionPieces(): Array<ChessPiece> {
      return this.turn == Branca ? this.promotionPiecesbranca : this.promotionPiecesPreta
    },
  },
})
</script>
<template>
  <div class="chessboard-parent">
    <h3 v-if="turn == Preta" style="color: black; text-align: center">
      <b>Pe??a Preta sua Vez!</b>
    </h3>
    <h3 v-else>&nbsp;</h3>
    <div class="cemiterio">
      <Piece v-for="(piece, index) in cemiterioPreta" :piece="piece" :key="index" />
    </div>
    <div class="chessboard">
      <Slot
        v-for="(slot, index) in flatSlots"
        :key="index"
        :odd_or_even="(index + Math.floor(index / 8)) % 2 == 0 ? 'even' : 'odd'"
        :piece="slot.piece || undefined"
        :move="slot.move || undefined"
        :hasMove="slot.hasMove"
        :turn="turn"
        :selected="selected === slot"
        :row="slot.row"
        :col="slot.col"
        :rainhaEmPerigo="RainhaEmPerigo"
        :waitingToSelect="selected == null"
        @selected="selectedPiece(slot)"
        @move="movePiece"
      />
    </div>
    <h3 v-if="turn == Branca" style="color: white; text-align: center">
      <b>Pe??a Branca sua Vez!</b>
    </h3>
    <h3 v-else>&nbsp;</h3>
    <div class="cemiterio">
      <Piece v-for="(piece, index) in cemiterioBranca" :piece="piece" :key="index" />
    </div>
    <Dialog :open="!!promotionDialog">
      <div style="width: 350px">
        <h3 style="text-align: center; margin-bottom: 16px">
          Escolha uma das pe??as para promover o Pe??o
        </h3>
        <div class="promotionList">
          <button
            @click="promoteTo(piece.type)"
            class="flatButton"
            v-for="piece in promotionPieces"
            :key="piece.id"
          >
            <Piece :piece="piece" />
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<style lang="scss" scoped>
.promotionList {
  display: flex;
  justify-content: center;
  width: 350px;
  height: 80px;
}
h3 {
  margin-top: 0px;
  margin-bottom: 0px;
}

.chessboard-parent {
  background: rgb(97, 73, 48);
  padding: 8px;
}

.chessboard {
  width: calc(100vh - 200px);
  height: calc(100vh - 200px);
  padding: 4px;
  display: grid;
  grid-template-columns: repeat(8, calc(100% / 8));
  grid-template-rows: repeat(8, calc(100% / 8));
}

.cemiterio {
  height: 40px;
  display: flex;
}
</style>
