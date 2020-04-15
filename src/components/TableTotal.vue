<template lang="pug">
    b-table(
      :data="data"
      paginated
      :perPage="5"
      default-sort="timestamp"
      default-sort-direction="desc"
    )
      template( v-slot="props" )
        b-table-column( field="timestamp" label="Дата" sortable ) {{ props.row.dateFormatted }}
        b-table-column( field="confirmed" label="Заражения" )
          span {{ props.row.confirmed }}
          sup.pl-1.c-red( v-if="props.row.confirmedChange" ) +{{ props.row.confirmedChange }}
        b-table-column( field="recovered" label="Выздоровления" )
          span {{ props.row.cured }}
          sup.pl-1.c-green( v-if="props.row.curedChange" ) +{{ props.row.curedChange }}
        b-table-column( field="deaths" label="Смерти" )
          span {{ props.row.deaths }}
          sup.pl-1.c-red( v-if="props.row.deathsChange" ) +{{ props.row.deathsChange }}
        b-table-column( field="activeCases" label="Активно" )
          span {{ props.row.activeCases }}
</template>

<script>
export default {
  name: 'TableTotal',
  components: {

  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  }
}
</script>
