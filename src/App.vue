<template lang="pug">
  .app.container
    b-navbar.app__navbar
      template( slot="start" )
        b-navbar-item(
          tag="router-link"
          :to="{ path: '/ru' }"
        )
          span.flag.flag--ru
          strong Вся Россия
        b-navbar-dropdown( label="Регионы" )
          b-navbar-item(
            v-for="region in regions"
            :key="region.code"
            tag="router-link"
            :to="{ path: '/' + region.code }"
          ) {{ region.title }}
      template( slot="end" )
        b-navbar-item(
          v-for="country in countries"
          :key="country.code"
          tag="router-link"
          :to="{ path: '/' + country.code }"
        )
          span.flag( :class="`flag--${country.code}`" )
          strong {{ country.title }}
    router-view.app__content
</template>

<script>
import { regions } from '@/localData'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    countries: ({ $store }) =>
      $store.getters['entities/regions/query']()
        .where(({ cid, rid }) => rid === 0 && cid !== 20)
        .orderBy('title', 'asc')
        .get(),
    regions: ({ $store }) =>
      $store.getters['entities/regions/query']()
        .where(({ cid, rid }) => cid === 20 && rid !== 0)
        .orderBy('order', 'asc')
        .orderBy('title', 'asc')
        .get()
  },
  async created () {
    // const CountryTotals = this.$store.$db().model('timeline')
    const Regions = this.$store.$db().model('regions')
    Regions.insert({ data: regions })

    // CountryTotals.api().fetch()
  }
}
</script>

<style lang="scss">
.app {
  &__navbar {

  }
}
</style>
