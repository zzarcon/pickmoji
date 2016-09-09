module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'chai'],
    files: [
      // 'src/*',
      'tests/*'
    ],
    exclude: [
    ],
    preprocessors: {
      'tests/*': ['browserify']
    },
    browserify: {
      debug: true
      // transform: [ 'brfs' ]
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  })
};