const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')

const isProd = process.env.NODE_ENV === 'production'

// multi pages entry
const pages = {
  index: 'src/main.js',
  infinite: {
    entry: 'src/infinite/main.js',
    template: 'public/index.html',
    filename: 'infinite.html',
  },
  sass: 'src/sass/main.js',
}

const dependencies = require('./package.json').dependencies
const getVersion = packageName => typeof dependencies[packageName] === 'string' ?
  dependencies[packageName].replace(/^(>=|>|<=|<|~|\^)/, '') :
  console.log(`not found package: ${packageName}`)

module.exports = {
  pages,
  chainWebpack: config => {
    const assets = {
      public: [
        `https://cdn.jsdelivr.net/npm/normalize.css@${getVersion('normalize.css')}/normalize.min.css`,
        `https://cdn.jsdelivr.net/npm/moment@${getVersion('moment')}/min/moment.min.js`,
        `https://cdn.jsdelivr.net/npm/js-cookie@${getVersion('js-cookie')}/src/js.cookie.min.js`,
        `https://cdn.jsdelivr.net/npm/axios@${getVersion('axios')}/dist/axios.min.js`,
        `https://cdn.jsdelivr.net/npm/lodash@${getVersion('lodash')}/lodash.min.js`,
      ],
      index: [
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap-grid.css',
        `https://unpkg.com/element-ui@${getVersion('element-ui')}/lib/theme-chalk/index.css`,
        `https://cdn.jsdelivr.net/npm/moment@${getVersion('moment')}/locale/zh-cn.min.js`,
        `https://cdn.jsdelivr.net/npm/moment@${getVersion('moment')}/locale/zh-tw.min.js`,
        `https://cdn.jsdelivr.net/npm/hammerjs@${getVersion('hammerjs')}/hammer.min.js`,
      ],
    }

    config
      .when(isProd,
        config => {
          assets.public.push(
            `https://cdn.jsdelivr.net/npm/vue@${getVersion('vue')}/dist/vue.runtime.min.js`,
            `https://unpkg.com/vue-router@${getVersion('vue-router')}/dist/vue-router.min.js`,
            `https://unpkg.com/vuex@${getVersion('vuex')}/dist/vuex.min.js`,
          )

          assets.index.push(
            `https://unpkg.com/element-ui@${getVersion('element-ui')}/lib/index.js`,
          )

          config.externals({
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            axios: 'axios',
            'element-ui': 'ELEMENT',
            Hammer: 'Hammer',
            lodash: '_',
            moment: 'moment',
          })
        }
      )


    config
      .when(!isProd,
        config => {
          config.externals({
            axios: 'axios',
            Hammer: 'Hammer',
            lodash: '_',
            moment: 'moment',
          })

          config.devtool('source-map')
        }
      )

    // multi pages include assets config
    Object.keys(pages).forEach(name => {
      name in assets && config
        .plugin(`tags-${name}`)
        .use(HtmlWebpackTagsPlugin, [{
          files: [`${name}.html`],
          tags: assets[name],
          append: false,
          publicPath: false,
        }])
    })

    // https://github.com/jharris4/html-webpack-tags-plugin
    config
      .plugin('tags')
      .use(HtmlWebpackTagsPlugin, [{
        tags: assets.public,
        append: false,
        publicPath: false,
      }])
  }
}