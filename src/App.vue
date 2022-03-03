<template>
  <div id="app" class="mb-4">
    <Header />
    <div class="container">
      <SetUp v-if="currentTab == 'setup'" />
      <div v-if="currentTab != 'setup'">
        <SetGame />
        <MakeCaptain v-if="myName.id" />
        <SetPolicy v-if="myName.captain" />
        <Board />
      </div>
    </div>
    <Modals />
  </div>
</template>

<script>
import bus from './socket.js'

import params from './lib/params.js'

import Header from './components/Header.vue'
import SetUp from './components/SetUp.vue'
import SetGame from './components/SetGame.vue'
import MakeCaptain from './components/MakeCaptain.vue'
import SetPolicy from './components/SetPolicy.vue'
import Board from './components/Board.vue'
import Modals from './components/Modals.vue'

export default {
  name: 'App',
  components: {
    Header,
    SetUp,
    SetGame,
    MakeCaptain,
    SetPolicy,
    Board,
    Modals
  },
  data() {
    return {
      date: '',
      message: ''
    }
  },
  computed: {
    isHost() {
      return this.$store.getters.getHost
    },
    currentTab() {
      return this.$store.getters.getCurrentTab
    },
    organisations() {
      return this.$store.getters.getOrganisations
    },
    team() {
      return this.$store.getters.getTeam
    },
    myName() {
      return this.$store.getters.getMyName
    }
  },
  created() {
    if (params.isParam('host')) {
      this.$store.dispatch('updateHost', true)
    }

    bus.on('loadOrganisations', (data) => {
      let organisation = params.getParam('organisation')
      if (organisation) {
        data.organisationFromUrl = organisation
      }
      const team = params.getParam('team')
      if (team) {
        data.teamFromUrl = team
      }
      this.$store.dispatch('loadOrganisations', data)
      const organisationId = localStorage.getItem('organisationId-it')
      let teamId = localStorage.getItem('teamId-it')
      const myNameId = localStorage.getItem('myNameId-it')
      if (organisationId) {
        this.$store.dispatch('setOrganisationId', organisationId)
        organisation = data.find(function(o) {
          return o.id == organisationId
        })
      }
      if (organisation && teamId) {
        const team = organisation.teams.find(function(t) {
          return t.id == teamId
        })
        if (team) {
          this.$store.dispatch('setTeamId', teamId)
        } else {
          teamId = null
        }
      }
      if (teamId && myNameId) {
        const myName = this.team.players.find(function(p) {
          return p.id == myNameId
        })
        if (myName) {
          this.$store.dispatch('setMyName', myName)
        }
      }
    })

    bus.emit('sendCheckDemoOrganisation')
  },
  methods: {
  }
}
</script>
