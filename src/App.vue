<template>
  <div id="app" class="mb-4">
    <Header />
    <div class="container">
      <h1>InterdependentTeams</h1>
      <SetUp v-if="currentTab == 'setup'" :socket="socket" />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

import params from './lib/params.js'

import Header from './components/Header.vue'
import SetUp from './components/SetUp.vue'

export default {
  name: 'App',
  components: {
    Header,
    SetUp
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
    }
  },
  created() {
    let connStr
    if (location.hostname == 'localhost') {
      connStr = 'http://localhost:3017'
    } else {
      connStr = 'https://agilesimulations.co.uk:3017'
    }
    console.log('Connecting to: ' + connStr)
    this.socket = io(connStr)

    if (params.isParam('host')) {
      this.$store.dispatch('updateHost', true)
    }

    this.socket.on('loadOrganisations', (data) => {
      console.log(data)
      this.$store.dispatch('loadOrganisations', data)
    })

    this.socket.emit('loadOrganisations')
  },
  methods: {
    send() {
      this.socket.emit('testMessage', {message: 'Hello World!'})
    }
  }
}
</script>
