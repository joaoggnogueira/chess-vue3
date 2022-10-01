<template>
  <div
    class="chess-slot"
    :class="{
      [odd_or_even]: true,
      [colorClass]: true,
      selectable: selectable,
      rainhaEmPerigo: rainhaEmPerigo && piece && piece.type == Rainha,
      selected: selected,
      eatable: move && piece,
      waitingToSelect: waitingToSelect,
      hasMove: hasMove,
    }"
    @click="onClick"
  >
    <!-- <span style="width: 100%; text-align: center; color: #455; position: absolute"
      >{{ row }}{{ col }}</span
    > -->
    <div class="chess-slot-piece" :style="{ backgroundImage: pieceImage }"></div>
    <div
      class="chess-slot-move"
      :class="{ selectable: !!move }"
      :style="{ backgroundImage: moveImage }"
    ></div>
  </div>
</template>
<script lang="ts">
import { ChessPiece, ChessPieceColor, ChessPieceType } from "@/types"

export default {
  props: {
    odd_or_even: { type: String, required: true },
    piece: { type: ChessPiece, required: false },
    move: { type: ChessPiece, required: false },
    turn: { type: Number, required: true },
    selected: { type: Boolean, required: true },
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    hasMove: { type: Boolean, required: true },
    waitingToSelect: { type: Boolean, required: true },
    rainhaEmPerigo: { type: Boolean, required: true },
  },
  data: () => ({
    Branca: ChessPieceColor.Branca,
    Preta: ChessPieceColor.Preta,
    Rainha: ChessPieceType.Rainha,
  }),
  computed: {
    selectable(): boolean {
      return !!this.piece && this.turn == this.piece.color
    },
    colorClass() {
      const piece = this.piece || this.move
      return piece ? (this.Branca == piece.color ? "white" : "black") : "uncolor"
    },
    pieceImage() {
      if (this.piece) {
        return `url('img/${this.piece.getImage()}')`
      } else {
        return ""
      }
    },
    moveImage() {
      if (this.move) {
        return `url('img/${this.move.getImage()}')`
      } else {
        return ""
      }
    },
  },
  methods: {
    onClick() {
      if (this.selectable) {
        this.$emit("selected")
      }
      if (this.move) {
        this.$emit("move", this.row, this.col, this.move)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.chess-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-size: 90% 90%;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;

  > .chess-slot-piece {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 90% 90%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  > .chess-slot-move {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 90% 90%;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.3;
    z-index: 2;
    &.selectable {
      cursor: pointer;
    }
  }

  &.hasMove {
    &.white {
      > .chess-slot-piece {
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.6));
      }
    }
    &.black {
      > .chess-slot-piece {
        filter: drop-shadow(4px 4px 2px rgba(255, 255, 255, 0.6));
      }
    }
  }
  &.eatable {
    background-position: left -50% top -50%;
    .chess-slot-move {
      background-position: right -50% bottom -50%;
    }
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &.selectable {
    &.hasMove {
      animation: moveableAnim 1s ease-out 0s infinite;
    }
    &.rainhaEmPerigo {
      background-color: red !important;
    }
  }
  &.selected {
    z-index: 99;
  }
  &.white {
    &.selectable {
      opacity: 1;
      &::after {
        z-index: 4;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
    &.selected {
      border: 4px dashed white;
    }
    &:hover > .chess-slot-move.selectable {
      opacity: 0.8;
      // background-color: rgba(0, 0, 0, 1);
    }
  }
  &.black {
    &.selectable {
      &::after {
        z-index: 4;
        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
    &.selected {
      border: 4px dashed black;
    }
    &:hover > .chess-slot-move.selectable {
      opacity: 0.8;
      // background-color: rgba(255, 255, 255, 1);
    }
  }
  &.selectable {
    cursor: pointer;
  }
  &.odd {
    background-color: rgb(91, 54, 25);
  }
  &.even {
    background-color: rgb(168, 109, 65);
  }
}
@keyframes moveableAnim {
  0% {
    transform: rotate(1deg);
  }
  25% {
    transform: rotate(-1deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(1deg);
  }
}
</style>
