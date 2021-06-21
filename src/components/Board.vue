<template>
  <div class="board">
    <BoardHeader />
    <Players />
    <table>
      <thead class="board-header">
        <tr>
          <th>
            Our Work
          </th>
          <th>
            Other Teams
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <ThisTeam />
          <OtherTeams />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BoardHeader from './board/BoardHeader.vue'
import Players from './board/Players.vue'
import ThisTeam from './board/ThisTeam.vue'
import OtherTeams from './board/OtherTeams.vue'

export default {
  components: {
    BoardHeader,
    Players,
    ThisTeam,
    OtherTeams
  },
  computed: {
    columns() {
      return this.$store.getters.getColumns
    }
  }
}
</script>

<style lang="scss">
.board {
  padding: 12px;
  color: #fff;
  border-color: #fff;

  //
  // Gradient
  //
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#7db9e8+0,207cca+44,0000ff+100 */
  $start: #7db9e8;
  $mid: #207cca;
  $end: #0000ff;
  background: #7db9e8; /* Old browsers */
  background: -moz-radial-gradient(center, ellipse cover,  $start 0%, $mid 44%, $end 100%); /* FF3.6-15 */
  background: -webkit-radial-gradient(center, ellipse cover,  $start 0%,$mid 44%,$end 100%); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(ellipse at center,  $start 0%,$mid 44%,$end 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='$start', endColorstr='$end',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  //
  // End Gradient
  //

  table {
    margin: 0 auto;

    .board-header {
      th {
        font-size: x-large;
        padding: 16px 0 0 0;
      }
    }

    th, td {
      width: 10%;
      padding: 6px;
    }
  }
}
</style>
