<template>
  <vue-final-modal name="feedback" classes="modal-container" content-class="vfm__content modal-content" v-model="modals['setPolicy']">
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
  </vue-final-modal>
</template>

<script>
import bus from '../../socket.js'

import { VueFinalModal } from 'vue-final-modal'

export default {
  components: {
    VueFinalModal
  },
  computed: {
    modals() {
      return this.$store.getters.getModals
    },
    organisationId() {
      return this.$store.getters.getOrganisationId
    },
    teamId() {
      return this.$store.getters.getTeamId
    },
    team() {
      return this.$store.getters.getTeam
    },
    policy() {
      return this.$store.getters.getPolicy
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('hideModal', 'setPolicy')
    },
    setPolicy() {
      const policy = document.getElementById('policy').value
      bus.emit('sendSetPolicy', {organisationId: this.organisationId, teamId: this.teamId, policy: policy})
      this.hide()
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-container {
  }
</style>
