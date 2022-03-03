<template>
  <span v-if="teamId" class="game-name">
    <button class="btn btn-sm btn-secondary mb-2" @click="show()">
      Set Policy
    </button>
  </span>
</template>

<script>
import params from '../lib/params.js'

export default {
  computed: {
    teamId() {
      return this.$store.getters.getTeamId
    }
  },
  methods: {
    show() {
      this.$store.dispatch('showModal', 'setPolicy')
    }
  }
}
</script>
