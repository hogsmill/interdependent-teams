<template>
  <span class="game-name">
    <button class="btn btn-sm btn-secondary mb-2" @click="show()">
      Set Up Game
    </button>
  </span>
</template>

<script>
import bus from '../socket.js'


export default {
  methods: {
    show() {
      bus.emit('sendLoadOrganisations')
      this.$store.dispatch('showModal', 'setGame')
    }
  }
}
</script>

<style lang="scss">


</style>
