<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-4">
    <a class="navbar-brand" href="https://agilesimulations.co.uk">
      <img src="/lego.png" class="ml-4" height="38px">
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <h1>Interdependent Teams</h1>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" :class="{ active: currentTab == 'game' }">
          <a class="nav-link pointer" @click="updateTab('game')">Game</a>
        </li>
        <li v-if="isHost" class="nav-item" :class="{ active: currentTab == 'setup' }">
          <a class="nav-link pointer" @click="updateTab('setup')">Set Up</a>
        </li>
        <li class="nav-item">
          <a class="nav-link pointer" @click="show()">Feedback</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import mailFuns from '../lib/mail.js'

export default {
  computed: {
    isHost() {
      return this.$store.getters.getHost
    },
    currentTab() {
      return this.$store.getters.getCurrentTab
    },
    thisGame() {
      return this.$store.getters.getThisGame
    }
  },
  methods: {
    updateTab(tab) {
      this.$store.dispatch('updateCurrentTab', tab)
    },
    show() {
      this.$store.dispatch('showModal', 'feedback')
    }
  }
}
</script>

<style>
  h1 {
    letter-spacing: initial;
    margin-left: 6px;
    font-weight: bold;
    text-shadow: 2px 2px 3px #444;
    font-size: xx-large;
    line-height: 1;
  }

  .feedback {
    letter-spacing: 0;
    color: #212529;
  }

  p.feedback-form {
    margin-bottom: 12px;
  }

  .feedback-form {
    width: 80%;
    margin: 0 auto;
  }
</style>
