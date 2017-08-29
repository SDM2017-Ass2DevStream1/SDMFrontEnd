kit = require 'nokit'
drives = kit.require 'drives'

{Promise} = kit

module.exports = (task, option) ->
  prepareBuild = (opts) ->
    installTask(opts).then ->
      kit.exec 'find . -name ".DS_Store" -type f -delete'

  ##
  # Options
  ##
  option '-q --quick', 'Will not run the optional tasks.'

  ##
  # Tasks
  ##
  task 'install', 'Install dependences.', installTask = (opts = {}) ->
    if opts.quick
      Promise.resolve()
    else
      kit.spawn 'yarn'
      .catch ->
        kit.spawn 'npm', ['install']

  task 'lint', 'Lint all js & coffee files.', lintTask = ->
    kit.glob ['assets/**/*.js']
    .then (fs) ->
      kit.spawn 'eslint', fs
    .then ->
      kit.warp [
        '*.coffee'
        'js/**/*.coffee'
      ]
      .load drives.auto 'lint'
      .load (f) ->
        f.set null
      .run()
    .catch ->

  task 'dev', 'Auto rebuild during development.', devTask = (opts) ->
    prepareBuild(opts).then ->
      kit.spawn 'webpack', ['--watch', '--progress'], {
        env: {
          NODE_ENV: 'development'
        }
      }

  task 'prod', 'Build for production environment.', (opts) ->
    prepareBuild(opts).then ->
      kit.spawn 'webpack', ['--progress'], {
        env: {
          NODE_ENV: 'production'
        }
      }

  task 'default', 'Default for development.', ->
    devTask({
      quick: true
    })
