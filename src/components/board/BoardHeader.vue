<template>
  <div>
    <h3>
      <span v-if="organisationId">{{ organisation.name }}</span>
      <span v-if="teamId"> - {{ team.name }}</span>
      <span v-if="myName.id"> - {{ myName.name }}</span>
      <i v-if="myName.captain" class="fas fa-star" title="I am the game captain" />
    </h3>
    <h4 v-if="policy">
      Policy: {{ policy }}
      <i v-if="organisation.hardPolicyEnforcement" class="fas fa-comment-slash" title="Hard enforcement" />
    </h4>
  </div>
</template>

<script>
export default {
  computed: {
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
    myName() {
      return this.$store.getters.getMyName
    },
    policy() {
      return this.$store.getters.getPolicy
    }
  }
}
</script>

<style>
  .fas {
    text-shadow: 2px 2px 3px #444;

    &.fa-star {
      color: gold;
      margin-left: 4px;
    }
  }
</style>
