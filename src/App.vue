<template>
  <div id="app" ref="app">
    <nav id="nav">
      <template v-for="item in routes">
        <router-link v-if="item.to" :key="item.label" :to="item.to">{{
          item.label
        }}</router-link>
        <a v-else :key="item.label" :href="item.href">{{ item.label }}</a>
      </template>
    </nav>
    <main id="main" ref="routerView">
      <transition :name="transitionName">
        <router-view class="router-view" :style="routerViewStyle" />
      </transition>
    </main>
  </div>
</template>

<script>
import './assets/stylus/base.styl'
import Hammer from 'hammerjs'
import { mapState } from 'vuex'

const routes = [
  { to: '/', label: 'Home' },
  { to: '/tween', label: 'Tween' },
  { to: '/bootstrap', label: 'Bootstrap' },
  { to: '/about', label: 'About' },
  { to: '/grid', label: 'Grid' },
  { href: '/sass', label: 'Sass' },
  { href: '/infinite', label: 'Infinite' },
]

export default {
  name: 'index',
  data() {
    return {
      deltaX: 0,
      transition: false,
      transitionName: 'page',
    }
  },
  computed: {
    routerViewStyle() {
      const style = {}
      const { deltaX, transition } = this

      if (deltaX !== 0) {
        style.transform = `translate(${deltaX}px, 0)`
      }

      if (transition) {
        style.transition = 'transform .4s cubic-bezier(0.0, 0.0, 0.2, 1)'
      }

      return style
    },
    routes() {
      return routes
    },
    ...mapState(['age']),
  },
  watch: {
    $route() {
      this.deltaX = 0
      this.$nextTick(() => {
        this.transitionName =
          'cacheTransitionName' in this
            ? this.cacheTransitionName
            : (this.cacheTransitionName = this.transitionName)
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.changeRouterLimit =
        parseInt(
          window
            .getComputedStyle(this.$refs.routerView)
            .getPropertyValue('width'),
        ) / 4
      this.createHammer()
    })
  },
  methods: {
    createHammer() {
      this.mc = new Hammer.Manager(this.$refs.routerView)

      this.mc.add(new Hammer.Pan())

      this.mc = new Hammer(this.$refs.routerView)

      this.mc.on('panmove', e => {
        this.transition = false

        const direction = e.offsetDirection

        if (direction === 4 || direction === 2) {
          this.deltaX = e.deltaX
        }
      })

      this.mc.on('panend pancancel', e => {
        const direction = e.offsetDirection

        if (direction === 4 || direction === 2) {
          if (Math.abs(e.deltaX) > this.changeRouterLimit) {
            this.routerHandler(direction)
          } else {
            this.transition = true
            this.deltaX = 0
          }
        }
      })
    },
    routerHandler(direction) {
      const { path } = this.$route

      const currentIndex = routes.findIndex(
        ({ to, href }) => path === (to || href),
      )
      let to = null

      if (direction === 4) {
        // to left prev router
        this.transitionName = 'slide-right'
        to = routes[currentIndex - 1] && routes[currentIndex - 1].to
      } else if (direction === 2) {
        // to right next router
        this.transitionName = 'slide-left'
        to = routes[currentIndex + 1] && routes[currentIndex + 1].to
      }

      if (to) {
        this.$router.push({ path: to })
        this.transition = false
      } else {
        this.transition = true
        this.deltaX = 0
      }
    },
  },
}
</script>

<style lang="stylus">
html,
body,
#app {
  height 100%
}

#app {
  display flex
  flex-flow column nowrap
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    padding: 0 10px
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#main {
  flex 1 0 auto
}

.router-view {
  position: absolute;
  width: 100%;
  height 100%
  overflow-x auto
  will-change: transform, opacity;
}

.slide-right-leave-active, .slide-right-enter-active, .slide-left-leave-active, .slide-left-enter-active {
  transition: all 0.4s cubic-bezier(0, 0, 0.2, 1);
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(100%, 0) !important;
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0) !important;
}
</style>
