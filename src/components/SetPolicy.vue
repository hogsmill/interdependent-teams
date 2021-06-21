<template>
  <span v-if="teamId" class="game-name">

    <button class="btn btn-sm btn-secondary mb-2" @click="show()">
      Set Policy
    </button>

    <modal name="set-policy" :height="180" :width="400" :classes="['rounded', 'set-game']">
      <div class="float-right mr-2 mt-1">
        <button type="button" class="close" @click="hide" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="mt-4">
        <h3>
          Set Policy
        </h3>
        <table>
          <tr>
            <td>
              Policy
            </td>
            <td>
              <select id="policy">
                <option value="">
                  -- Select --
                </option>
                <option v-for="(pol, index) in team.policies" :key="index" :selected="pol == policy">
                  {{ pol }}
                </option>
              </select>
            </td>
          </tr>
        </table>
        <button class="btn btn-sm btn-secondary smaller-font" @click="setPolicy()">
          Done
        </button>
      </div>
    </modal>

  </span>
</template>

<script>
import bus from '../socket.js'

import params from '../lib/params.js'

export default {
  computed: {
    organisationId() {
      return this.$store.getters.getOrganisationId
    },
    teamId() {
      return this.$store.getters.getTeamId
    },
    team() {
      return this.$store.getters.getTeam
    },
    policies() {
      return this.$store.getters.getPolicies
    },
    policy() {
      return this.$store.getters.getPolicy
    }
  },
  methods: {
    show() {
      this.$modal.show('set-policy')
    },
    hide() {
      this.$modal.hide('set-policy')
    },
    setPolicy() {
      const policy = document.getElementById('policy').value
      bus.$emit('sendSetPolicy', {organisationId: this.organisationId, teamId: this.teamId, policy: policy})
      this.hide()
    }
  }
}
</script>

<style lang="scss">

  .set-game {
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
