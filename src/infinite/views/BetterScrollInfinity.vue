<template>
  <section class="better-scroll-infinity">
    <div class="template" v-once>
      <li class="wrapper-item" ref="item">
        <img alt />
      </li>
      <li ref="tombstone" class="wrapper-item tombstone"></li>
    </div>

    <div class="wrapper" ref="wrapper">
      <ul></ul>
    </div>
  </section>
</template>

<script>
// doc: https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/
import BScroll from "better-scroll";

export default {
  name: "BetterScrollInfinity",
  data() {
    return {
      total: 0,
      totalReject: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.createInfinityScroll();
    });
  },
  beforeDestroy() {
    "scroll" in this && this.scroll.destroy();
  },
  methods: {
    createInfinityScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: false,
        infinity: {
          fetch: count => {
            this.totalReject = [];
            count = Math.max(30, count);
            const index = Math.floor(this.total / count) + 1;

            return new Promise(resolve => {
              this.axios
                .get(`https://gank.io/api/data/福利/${count}/${index}`)
                .then(res => {
                  const data = res.data.results;

                  if (data.length) {
                    resolve(
                      Promise.all(
                        data.map(
                          ({ _id: id, url }, index) =>
                            new Promise(resolve => {
                              const image = new Image();
                              image.src = url;
                              image.addEventListener("load", function() {
                                resolve({ id, image });
                              });

                              image.addEventListener("error", function() {
                                this.totalReject.push(index);
                                resolve();
                              });
                            })
                        )
                      ).then(res =>
                        res.filter(
                          (item, index) => this.totalReject.indexOf(index) < 0
                        )
                      )
                    );

                    this.total += count;
                  } else {
                    resolve(false);
                  }
                });
            });
          },
          render: (item, li) => {
            li = li || this.$refs.item.cloneNode(true);
            li.dataset.id = item.id;
            li.querySelector("img").src = item.image.src;

            return li;
          },
          createTombstone: () => {
            return this.$refs.tombstone.cloneNode(true);
          }
        },
        mouseWheel: true
      });
    }
  }
};
</script>

<style lang="stylus">
.better-scroll-infinity {
  flex: 1;
  width: 100%;
}

.template {
  display: none;
}

.wrapper {
  width: 100%;
  height: 100%;
  contain: layout;
  will-change: transform;

  .wrapper-item {
    width: 100%;
    padding: 10px 0;
    contain: layout;
    will-change: transform;
  }
}
</style>
