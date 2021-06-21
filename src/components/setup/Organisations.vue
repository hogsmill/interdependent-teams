<template>
  <table class="config-organisations">
    <tr>
      <td>
        <h4>Organisations</h4>
        <i v-if="showOrganisations" @click="setShowOrganisations(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showOrganisations" @click="setShowOrganisations(true)" title="expand" class="fas fa-caret-down toggle" />
      </td>
    </tr>
    <tr v-if="showOrganisations">
      <td>
        <table>
          <tr>
            <td colspan="3">
              New Organisation <input type="text" class="new-organisation" id="new-organisation">
              <button class="btn btn-sm btn-site-primary" @click="addOrganisation()">
                Add
              </button>
            </td>
          </tr>
          <tr>
            <td />
            <td />
            <td class="center">
              Hard Policy<br>Enforcement?
            </td>
          </tr>
          <tr v-for="(organisation, index) in organisations" :key="index">
            <td>
              <i @click="updateOrganisation(organisation.id)" :title="'Update ' + organisation.organisation + ' Name'" class="fas fa-save" />
              <i @click="deleteOrganisation(organisation.id)" :title="'Delete ' + organisation.organisation" class="fas fa-trash-alt" />
            </td>
            <td>
              <input type="text" :value="organisation.name" :id="'organisation-' + organisation.id">
            </td>
            <td class="center">
              <input type="checkbox" :checked="organisation.hardPolicyEnforcement" @click="togglePolicyEnforcement(organisation.id)">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script>
import bus from '../../socket.js'

export default {
  data() {
    return {
      showOrganisations: false,
      currentOrganisation: ''
    }
  },
  computed: {
    organisations() {
      return this.$store.getters.getOrganisations
    }
  },
  methods: {
    setShowOrganisations(val) {
      this.showOrganisations = val
    },
    addOrganisation() {
      const organisation = document.getElementById('new-organisation').value
      if (!organisation) {
        alert('Please enter a value')
      } else {
        bus.$emit('sendAddOrganisation', {organisation: organisation})
        document.getElementById('new-organisation').value = ''
      }
    },
    updateOrganisation(id) {
      const organisation = document.getElementById('organisation-' + id).value
      if (!organisation) {
        alert('Please enter a value')
      } else {
        bus.$emit('sendUpdateOrganisation', {organisationId: id, organisation: organisation})
      }
    },
    deleteOrganisation(id) {
      bus.$emit('sendDeleteOrganisation', {organisationId: id})
    },
    togglePolicyEnforcement(id) {
      bus.$emit('sendTogglePolicyEnforcement', {organisationId: id})
    }
  }
}
</script>

<style lang="scss">
  .config-organisations {

    .new-organisation {
      width: 200px !important;
    }

    input[type=text] {
      width: 200px;
    }
  }
</style>
