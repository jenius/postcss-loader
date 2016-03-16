var postcss = require('postcss')
var assign = require('lodash.assign')

module.exports = function (source, map) {
  if (this.cacheable) this.cacheable()

  var f = this.resourcePath
  var defaults = { from: f, to: f, map: { inline: false, annotation: false } }
  var options = this.options.postcss

  // options can be an object or a function that returns an object
  if (typeof options === 'function') { options = options.call(this, this) }
  options = assign(defaults, options)

  if (typeof map === 'string') { map = JSON.parse(map) }
  if (map && map.mappings) { defaults.map.prev = map }

  var loader = this
  var callback = this.async()

  if (options.parser === 'postcss-js') {
    source = this.exec(source, this.resource)
  }

  postcss(options.plugins).process(source, options)
    .then(function (result) {
      result.warnings().forEach(function (msg) {
        loader.emitWarning(msg.toString())
      })
      callback(null, result.css, result.map ? result.map.toJSON() : null)
    })
    .catch(function (error) {
      if (error.name === 'CssSyntaxError') {
        loader.emitError(error.message + error.showSourceCode())
        callback()
      } else {
        callback(error)
      }
    })
}
