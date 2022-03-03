<template>
  <span class="game-name">
    <button class="btn btn-sm btn-secondary mb-2" @click="makeMeCaptain()">
      Make Me Game Captain
    </button>
  </span>
</template>

<script>
import bus from '../socket.js'

export default {
  computed: {
    organisationId() {
      return this.$store.getters.getOrganisationId
    },
    teamId() {
      return this.$store.getters.getTeamId
    },
    myName() {
      return this.$store.getters.getMyName
    }
  },
  methods: {
    makeMeCaptain() {
      const myName = this.myName
      myName.captain = true
      this.$store.dispatch('setMyName', myName)
      bus.emit('sendMakeCaptain', {organisationId: this.organisationId, teamId: this.teamId, player: this.myName})
    }
  }
}
</script>
