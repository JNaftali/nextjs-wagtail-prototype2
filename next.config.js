module.exports = (phase, {defaultConfig}) => ({
  ...defaultConfig,
  experimental: {
    reactRefresh: true
  }
})