<template>
  <div v-if="teamId">
    <div v-for="(player, index) in team.players" :key="index" class="player">
      <div>
        {{ player.name }}
      </div>
      <div v-for="n in player.effort.available" :key="n" class="effort" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    teamId() {
      return this.$store.getters.getTeamId
    },
    team() {
      return this.$store.getters.getTeam
    }
  }
}
</script>

<style lang="scss">
  .player {
    background-color: #fff;
    color: #444;
    width: 140px;
    padding: 6px;
    margin: 6px;
    display: inline-block;

    .effort {
      display: inline-block;
      background-color: #888;
      border-radius: 5px;
      width: 10px;
      height: 10px;
      margin: 2px;
    }
  }
</style>
