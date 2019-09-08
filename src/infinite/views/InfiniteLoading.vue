<template>
  <section class="wrapper infinite-loading">
    <ul>
      <li class="item" v-for="item in list" :key="item.id">
        <img :src="item.url" alt />
      </li>
    </ul>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </section>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "InfiniteLoad",
  components: {
    InfiniteLoading
  },
  data() {
    return {
      page: 1,
      list: []
    };
  },
  methods: {
    infiniteHandler($state) {
      this.axios
        .get(`https://gank.io/api/data/福利/10/${this.page}`)
        .then(res => {
          const { results: data } = res.data;

          if (data.length) {
            this.page += 1;

            this.list.push(...data.map(({ url, _id: id }) => ({ url, id })));

            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  }
};
</script>

<style lang="stylus">
.infinite-loading {
  width: 100%;
  overflow: auto;
}
</style>
