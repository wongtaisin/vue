module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vmin',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
    }
  },
}
