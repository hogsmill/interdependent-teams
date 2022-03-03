<template>
  <div class="work-card" :class="{'pullable' : canPullInCard()}" @click="pullInCard()">
    <div class="work-card-header">
      #{{ card.number }}
    </div>
    <table class="work-card-footer">
      <thead>
        <tr>
          <th>
            COMMIT
          </th>
          <th>
            DELIVER
          </th>
          <th>
            SPRINTS
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            0
          </td>
          <td>
            0
          </td>
          <td>
            0
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../../socket.js'

export default {
  props: [
    'column',
    'card',
    'index'
  ],
  computed: {
    organisationId() {
      return this.$store.getters.getOrganisationId
    },
    teamId() {
      return this.$store.getters.getTeamId
    },
  },
  methods: {
    canPullInCard() {
      return this.column == 'backlog' && this.index == 0
    },
    pullInCard() {
      if (this.canPullInCard()) {
        bus.emit('sendPullInCard', {organisationId: this.organisationId, teamId: this.teamId, card: this.card})
      }
    }
  }
}
</script>

<style lang="scss">
  .work-card {
    width: 150px;
    background-color: #fff;
    color: #444;
    margin: 6px 0;
    box-shadow: 2px 2px 3px #444;
    animation: fadein 1s;

    .pullable {
      &:hover {
        cursor: pointer;
      }
    }

    .work-card-header {
      font-weight: bold;
      text-align: right;
      padding: 2px;
    }

    .work-card-footer {
      width: 100%;
      font-size: x-small;

      th, td {
        padding: 2px;
      }
    }
  }
</style>
