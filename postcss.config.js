module.exports = {
  plugins: {
    autoprefixer: {},
    // https://github.com/evrone/postcss-px-to-viewport#usage
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [
        /node_modules/,
        /src(\/|\\)(?!mobile)/,
        /public/,
      ],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    }
  }
}
