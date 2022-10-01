<template>
  <div class="piece">
    <img :src="imageSrc" />
  </div>
</template>
<script>
import { ChessPiece, ChessPieceColor, ChessPieceType } from "@/types"

export default {
  props: {
    piece: ChessPiece,
  },
  computed: {
    imageSrc() {
      if (this.piece) {
        return `img/${this.piece.getImage()}`
      } else {
        return null
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.piece {
  height: 100%;
  object-fit: contain;
  > img {
    height: 100%;
  }
}
</style>
