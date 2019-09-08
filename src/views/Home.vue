<template>
  <div class="home">
    <img
      ref="logo"
      alt="Vue logo"
      src="../assets/logo.png"
      :style="{ transform: `translate3d(${deltaX}px, ${deltaY}px, 0)` }"
    >
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <hr>
    <h1>{{ formatTime }}</h1>
    <button type="button" data-locale="zh-cn" @click="toggleLanguage">简体</button>
    <button type="button" data-locale="zh-tw" @click="toggleLanguage">繁体</button>
    <button type="button" data-locale="en" @click="toggleLanguage">英语</button>
  </div>
</template>

<script>
import Hammer from 'hammerjs'
import _ from 'lodash'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      lang: this.moment.locale(),
      deltaX: 0,
      deltaY: 0,
    }
  },
  computed: {
    formatTime() {
      this.moment.locale(this.lang)
      return this.moment().endOf('day').fromNow()
    }
  },
  async created() {
    await this.task()
      .catch(err => console.log(`${err.name}: ${err.message}`))

    console.log('async fun after')
  },
  mounted() {
    this.manager = new Hammer.Manager(this.$refs.logo)
    // this.manager.add(new Hammer.Swipe())
    this.manager.add(new Hammer.Pan())

    /* this.manager.on('swipe', e => {
      const direction = e.offsetDirection
      
      if (direction === 4 || direction === 2 || direction === 16 || direction === 8) {
        this.deltaX += e.deltaX
        this.deltaY += e.deltaY
      }
    }) */

    this.manager.on('hammer.input', e => {
      e.srcEvent.stopPropagation()
    })

    this.manager.on('panstart', () => {
      this.x = this.deltaX
      this.y = this.deltaY
    })

    this.manager.on('panmove', e => {
      const direction = e.offsetDirection
      
      if (direction === 4 || direction === 2 || direction === 16 || direction === 8) {
        this.deltaX = this.x + e.deltaX
        this.deltaY = this.y + e.deltaY
      }
    })
  },
  beforeDestroy() {
    _.isObject(this.manager) && this.manager.destroy()
  },
  methods: {
    toggleLanguage(e) {
      const currentLang = e.target.getAttribute('data-locale')
      this.lang = currentLang
    },
    task() {
      return new Promise((resolve, reject) =>
        setTimeout(reject.bind(null, Error('has Error!')), 0)
      )
    }
  },
}
</script>
