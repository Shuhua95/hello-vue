<template>
  <section class="better-scroll wrapper" ref="wrapper">
    <ul>
      <li
        class="item"
        v-for="item in list"
        :key="item.id"
      >
        <img :src="item.url" alt="">
      </li>
    </ul>
  </section>
</template>

<script>
// doc: https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/
import BScroll from 'better-scroll'

const options = {
  mouseWheel: true,
  scrollbar: {
    fade: true
  },
  pullUpLoad: {
    threshold: 0,
    txt: {
      more: '加载更多',
      noMore: '没有更多数据'
    }
  }
}

export default {
  name: 'BetterScroll',
  data() {
    return {
      page: 1,
      list: [],
    }
  },
  mounted() {
    this.fetchDate()
  },
  beforeDestroy() {
    this.scroll.destroy()
  },
  methods: {
    fetchDate() {
      this.axios.get(`https://gank.io/api/data/福利/10/${this.page++}`).then(res => {
        const { results: data } = res.data
        this.list.push(...data.map(({ url, _id: id }) => ({ url, id })))

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, options)
            this.scroll.on('pullingUp', () => {
              this.fetchDate()

              // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
              this.scroll.finishPullUp()
            })
          } else {
            this.scroll.refresh()
          }
        })
      })
    }
  }
}
</script>
