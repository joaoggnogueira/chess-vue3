<template>
  <div class="dialog-container" :class="{ open }">
    <div class="dialog"><slot /></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    open: { type: Boolean, required: true },
  },
})
</script>
<style lang="scss">
.dialog-container {
  position: fixed;
  backdrop-filter: blur(4px);
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 99;
  display: none;
  &.open {
    display: block;
  }
  > .dialog {
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    padding: 48px 24px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    background: rgb(97, 73, 48);
  }
}
</style>
