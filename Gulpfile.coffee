gulp = require 'gulp'

# Paths config
nodeModules = './node_modules/'

paths =
  src:          './app/'
  dest:         './build/'
  node_modules: './node_modules/'
  jadeSrc:      './app/index.jade'

  bundle:
    src: 'coffee/manifest.coffee'
    dest: 'app.js'

  sass:
    src:  './app/sass/app.sass'
    dest: './build/css/'

  copy:
    font_awesome:
      src:  nodeModules + 'font-awesome/fonts/*'
      dest: './build/fonts'

    img:
      src:  './app/img/*'
      dest: './build/img'

  concat:
    dest: 'vendor.js'
    src: [
      nodeModules + 'jquery/dist/jquery.js'
      nodeModules + 'underscore/underscore.js'
      nodeModules + 'backbone/backbone.js'
      nodeModules + 'backbone-relational/backbone-relational.js'
      nodeModules + 'backbone.babysitter/lib/backbone.babysitter.js'
      nodeModules + 'backbone.wreqr/lib/backbone.wreqr.js'
      nodeModules + 'backbone.marionette/lib/core/backbone.marionette.js'
      nodeModules + 'backbone-metal/dist/backbone-metal.js'
      nodeModules + 'backbone-routing/dist/backbone-routing.js'
      nodeModules + 'backbone.radio/build/backbone.radio.js'
      nodeModules + 'backbone.syphon/lib/backbone.syphon.js'
      nodeModules + 'marionette-service/dist/marionette-service.js'
      nodeModules + 'tether/dist/js/tether.min.js'
      nodeModules + 'bootstrap/dist/js/bootstrap.min.js'
      nodeModules + 'bluebird/js/browser/bluebird.min.js'
    ]

# Import Plugins
plugins = require 'gulp_tasks/gulp/config/plugins'
plugins.browserify = require 'gulp-browserify'

# Import tasks
require('gulp_tasks/gulp/tasks/env')(gulp, paths, plugins)
require('gulp_tasks/gulp/tasks/copy')(gulp, paths, plugins)
require('gulp_tasks/gulp/tasks/sass')(gulp, paths, plugins)
require('gulp_tasks/gulp/tasks/jade')(gulp, paths, plugins)
require('gulp_tasks/gulp/tasks/watch')(gulp, paths, plugins)
require('gulp_tasks/gulp/tasks/webserver')(gulp, paths, plugins)
require('gulp_tasks/gulp/tasks/noop')(gulp, paths, plugins)

# # # # #

# Concat Task
gulp.task 'concat', ->
  stream = gulp.src(paths.concat.src)
    .pipe plugins.plumber()
    .pipe plugins.concat(paths.concat.dest)

  stream.pipe uglify() if process.env.NODE_ENV == 'prod'
  stream.pipe gulp.dest paths.dest + 'js/'

# Bundle task
gulp.task 'bundle', ->
  stream = gulp.src(paths.src + paths.bundle.src, { read: false })
    .pipe plugins.plumber()
    .pipe plugins.browserify
      debug:      if process.env.NODE_ENV == 'prod' then 'production' else 'development'
      debug:      true
      transform:  ['coffeeify', 'jadeify']
      extensions: ['.coffee', '.jade']
    .pipe plugins.concat(paths.bundle.dest)

  stream.pipe uglify() if process.env.NODE_ENV == 'prod'
  stream.pipe gulp.dest paths.dest + 'js/'

# # # # #

# Watch Task
gulp.task 'watch', ->
  gulp.watch paths.src + '**/*.coffee',  ['bundle']
  gulp.watch paths.src + '**/*.jade',    ['bundle', 'jade']
  gulp.watch paths.src + '**/*.sass',    ['sass']

# Build tasks
gulp.task 'default', ['dev']

gulp.task 'dev', =>
  plugins.runSequence.use(gulp)('env_dev', 'copy_fontawesome', 'copy_images', 'sass', 'jade', 'concat', 'bundle', 'watch', 'webserver')

gulp.task 'release', =>
  plugins.runSequence.use(gulp)('env_prod', 'copy_fontawesome', 'copy_images', 'sass', 'jade', 'concat', 'bundle', => console.log 'Release completed.' )
