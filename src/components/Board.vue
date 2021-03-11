<template>
  <div class="board">
    <table>
      <thead>
        <tr>
          <th>
            Backlog
          </th>
          <th>
            Other Teams
          </th>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Backlog :socket="socket" />
          <OtherTeams :socket="socket" />
          <td v-for="(column, index) in columns" :key="index">
            <Column :column="column" :socket="socket" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Backlog from './board/Backlog.vue'
import OtherTeams from './board/OtherTeams.vue'
import Column from './board/Column.vue'

export default {
  components: {
    Backlog,
    OtherTeams,
    Column
  },
  props: [
    'socket'
  ],
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

    th {
      background-color: #fff;
      color: #444;
    }
    
    th, td {
      width: 10%;
      padding: 6px;
      border: 1px solid;
    }
  }
}
</style>
