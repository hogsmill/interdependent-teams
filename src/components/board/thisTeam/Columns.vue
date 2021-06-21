<template>
  <table class="columns">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index" :class="column.name">
          {{ columnDisplayName(column.name) }} ({{ column.cards.length }})
          <i v-if="myName.captain && policy && column.name == 'backlog'" class="fas fa-play-circle" title="Re-start game" @click="startGame()" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="(column, index) in columns" :key="index" class="column">
          <Card v-for="(card, cindex) in column.cards" :key="cindex" :card="card" :column="column.name" :index="cindex" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import bus from '../../../socket.js'

import stringFuns from '../../../lib/stringFuns.js'

import Card from './Card.vue'

export default {
  components: {
    Card
  },
  computed: {
    organisationId() {
      return this.$store.getters.getOrganisationId
    },
    myName() {
      return this.$store.getters.getMyName
    },
    columns() {
      return this.$store.getters.getColumns
    },
    policy() {
      return this.$store.getters.getPolicy
    }
  },
  methods: {
    columnDisplayName(s) {
      return stringFuns.properCase(s)
    },
    cardsInPlay() {
      let  cardsInPlay = false
      for (let i = 1; i < this.columns.length; i++) {
        if (!cardsInPlay && this.columns[i].cards.length) {
          cardsInPlay = true
        }
        return cardsInPlay
      }
    },
    startGame() {
      if (this.cardsInPlay()) {
        if (confirm('Restart this game?')) {
          bus.$emit('sendStartGame',  {organisationId: this.organisationId})
        }
      } else {
        bus.$emit('sendStartGame',  {organisationId: this.organisationId})
      }
    }
  }
}
</script>

<style lang="scss">
  .columns {
    margin-top: 6px !important;
    width: 100%;

    td, th {
      border: 2px solid;
    }

    .backlog {
      background-color: navy;
    }
    .doing {
      background-color: #b10018;
    }
    .test {
      background-color: #4f0384;
    }
    .done {
      background-color: #76a001;
    }

    .fa-play-circle {
      &:hover {
        cursor: pointer;
        color: #888;
      }
    }

    .column {
      vertical-align: top;

      .card {
        color: #444;
      }
    }
  }
</style>
