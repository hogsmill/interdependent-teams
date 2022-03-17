<template>
  <vue-final-modal name="feedback" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['setGame']">
    <div class="float-right mr-2 mt-1">
      <button type="button" class="close" @click="hide" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="mt-4">
      <h3>
        Set Up Game
      </h3>
      <table>
        <tr>
          <td>
            Organisation
          </td>
          <td>
            <div v-if="!organisationFromUrl">
              <select id="organisation" @change="setOrganisation()">
                <option value="">
                  -- Select --
                </option>
                <option v-for="(org, index) in organisations" :key="index" :selected="organisationId && org.id == organisationId" :value="org.id">
                  {{ org.name }}
                </option>
              </select>
            </div>
            <div v-if="organisationFromUrl">
              <b>{{ organisationFromUrl }}</b>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            Team
          </td>
          <td>
            <div v-if="!teamFromUrl">
              <select v-if="organisationId" id="team" @change="setTeam()">
                <option value="">
                  -- Select --
                </option>
                <option v-for="(t, index) in organisation.teams" :key="index" :selected="t.id == teamId" :value="t.id">
                  {{ t.name }}
                </option>
              </select>
            </div>
            <div v-if="teamFromUrl">
              <b>{{ teamFromUrl }}</b>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            My Name
          </td>
          <td>
            <div>
              <select id="my-name" v-if="teamId && team.players.length" @change="setMyName()">
                <option value="">
                  -- Select --
                </option>
                <option v-for="(player, index) in team.players" :key="index" :selected="player.id == myName.id" :value="player.id">
                  {{ player.name }}
                </option>
              </select>
            </div>
          </td>
        </tr>
      </table>
      <button class="btn btn-sm btn-secondary smaller-font" @click="hide()">
        Done
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

import params from '../../lib/params.js'

export default {
  components: {
    VueFinalModal
  },
  data() {
    return {
      organisationFromUrl: null,
      teamFromUrl: null
    }
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    },
    organisations() {
      return this.$store.getters.getOrganisations
    },
    organisationId() {
      return this.$store.getters.getOrganisationId
    },
    organisation() {
      return this.$store.getters.getOrganisation
    },
    teamId() {
      return this.$store.getters.getTeamId
    },
    team() {
      return this.$store.getters.getTeam
    },
    players() {
      return this.$store.getters.getPlayers
    },
    myName() {
      return this.$store.getters.getMyName
    }
  },
  created() {
    this.organisationFromUrl = params.getParam('organisation')
    if (this.organisationFromUrl) {
      this.teamFromUrl = params.getParam('team')
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('hideModal', 'setGame')
    },
    setOrganisation() {
      const organisationId = document.getElementById('organisation').value
      localStorage.setItem('organisationId-it', organisationId)
      this.$store.dispatch('setOrganisationId', organisationId)
    },
    setTeam() {
      const teamId = document.getElementById('team').value
      localStorage.setItem('teamId-it', teamId)
      this.$store.dispatch('setTeamId', teamId)
    },
    setMyName() {
      const myNameId = document.getElementById('my-name').value
      const myName = this.team.players.find(function(p) {
        return p.id == myNameId
      })
      localStorage.setItem('myNameId-it', myName.id)
      this.$store.dispatch('setMyName', myName)
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-container {
    table {
      margin: 0 auto;
      td {
        padding: 4px;

        input, select {
          width: 180px;
          padding: 4px;
          margin-bottom: 8px;
          display: inline-block;
        }
        div {
          text-align: left;
          width: 250px;
        }
        .fas {
          font-size: x-large;
          color: #888;
          display: inline-block;
          margin: 0px 8px;
          position: relative;
          top: 4px;

          &:hover {
            cursor: pointer;
            color: #444;
          }
        }
      }
    }
  }
</style>
