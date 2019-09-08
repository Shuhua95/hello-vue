<template>
  <div id="app">
    <h1>multi pages test</h1>
    <nav>
      <router-link to="/better-scroll">better-scroll</router-link> |
      <router-link to="/better-scroll-infinity">better-scroll-infinity</router-link> |
      <router-link to="/vue-infinite-loading">vue-infinite-loading</router-link> |
      <a href="/">go to /</a>
    </nav>
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import '../assets/stylus/base.styl'

export default {
  name: 'pageone',
  data() {
    return {
      page: 1,
      list: []
    }
  },
  created() {
    this.axios.get(`https://gank.io/api/data/福利/10/${this.page++}`).then(res => {
        const { results: data } = res.data
        this.list.push(...data.map(({ url, _id: id }) => ({ url, id })))
    })
  }
}
</script>

<style lang="stylus">
#app
  display flex
  flex-flow column nowrap
  align-items center
  height 100vh

.wrapper
  position relative
  flex 1
  overflow hidden

.wrapper
  .item
    & + .item
      margin-top 10px

.scroller {
  height: 100%;
  width 500px
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
