<script lang="ts">
import Chess from "@/components/chess/index.vue"
export default {
  components: {
    Chess,
  },
}
</script>

<template>
  <main>
    <Chess />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
