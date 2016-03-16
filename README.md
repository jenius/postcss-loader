# PostCSS for Webpack [![Build Status][ci-img]][ci]

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[PostCSS] loader for [webpack] to postprocesses your CSS with [PostCSS plugins].

[PostCSS plugins]: https://github.com/postcss/postcss#plugins
[PostCSS]:         https://github.com/postcss/postcss
[webpack]:         http://webpack.github.io/
[ci-img]:          https://travis-ci.org/postcss/postcss-loader.svg
[ci]:              https://travis-ci.org/postcss/postcss-loader

## Usage

Set `postcss` section in webpack config:

```js
var autoprefixer = require('autoprefixer');
var precss       = require('precss');

module.exports = {
  module: {
    loaders: [
      { test:   /\.css$/, loader: "style-loader!css-loader!postcss-loader" }
    ]
  },
  postcss: { plugins: [autoprefixer, precss] }
}
```

This must be an object, or a function that returns an object. You can use the `plugins`, `syntax`, `parser`, and/or `stringifier` keys in this pbject to contain your options for postcss.

Now your CSS files requirements will be processed by selected PostCSS plugins:

```js
var css = require('./file.css');
// => CSS after Autoprefixer and CSSWring
```

Note that the context of this function

```js
module.exports = {
    ...
  postcss: function () {
    return { plugins: [autoprefixer, precss] }
  }
}
```

will be set to the [webpack loader-context].
If there is the need, this will let you access to webpack loaders API.

[webpack loader-context]: http://webpack.github.io/docs/loaders.html#loader-context

## Integration with postcss-import

When using [postcss-import] plugin, you may want to tell webpack about
dependencies coming from your `@import` directives.
For example: in watch mode, to enable recompile on change.

Here is a simple way to let know postcss-import to pass files to webpack:

```js
var postcssImport = require('postcss-import');

module.exports = {
  module: {
    loaders: [
      { test:   /\.css$/, loader: "style-loader!css-loader!postcss-loader" }
    ]
  },
  postcss: function (webpack) {
    return [postcssImport({ addDependencyTo: webpack }) ]
  }
}
```

[webpack loader-context]: http://webpack.github.io/docs/loaders.html#loader-context
[postcss-import]:         https://github.com/postcss/postcss-import

## Integration with CSS Modules

`postcss-loader` [cannot be used] with [CSS Modules] out of the box due
to the way `css-loader` processes file imports. To make them work properly,
either add the css-loader’s [`importLoaders` option]:

```js
{
  test:   /\.css$/,
  loader: "style-loader!css-loader?modules&importLoaders=1!postcss-loader"
}
```

or replace `css-loader` with [postcss-modules] plugin.

[`importLoaders` option]: https://github.com/webpack/css-loader#importing-and-chained-loaders
[postcss-modules]:        https://github.com/outpunk/postcss-modules
[cannot be used]:         https://github.com/webpack/css-loader/issues/137
[CSS Modules]:            https://github.com/webpack/css-loader#css-modules
