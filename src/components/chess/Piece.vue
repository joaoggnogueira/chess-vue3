<template>
  <div class="piece">
    <img :src="imageSrc" />
  </div>
</template>
<script lang="ts">
import { ChessPiece } from "@/types"
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    piece: ChessPiece,
  },
  computed: {
    imageSrc(): string {
      if (this.piece) {
        return `img/${this.piece.getImage()}`
      } else {
        return ``
      }
    },
  },
})
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
