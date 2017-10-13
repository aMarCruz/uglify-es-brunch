[![npm][npm-image]][npm-url]
[![License][license-image]][license-url]

# uglify-es-brunch

Adds [UglifyES](https://github.com/mishoo/UglifyJS2/tree/harmony) support to
[brunch](http://brunch.io).

The plugin will minify your javascript files (ES5, ES6 and higher).

## Usage

Install the plugin via npm with `npm install --save-dev uglify-es-brunch`.

Or, do manual install:

* Add `"uglify-es-brunch": "x.y.z"` to `package.json` of your brunch app. Pick a plugin version that corresponds to your minor (y) brunch version.

* If you want to use git version of plugin, add `"uglify-es-brunch": "git+ssh://git@github.com:aMarCruz/uglify-es-brunch.git"`.

To specify UglifyES options, use `config.plugins.uglify` object, for example:

```js
module.exports = {
  // ...
  plugins: {
    uglify: {
      mangle: false,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    }
  }
};
```

Joined files can be ignored and be passed-through, using 'ignored' option:

```js
module.exports = {
  plugins: {
    uglify: {
      ignored: /non_minimize\.js/
    }
  }
};
```

## License

The [MIT License](LICENCE) (MIT)

Copyright (c) 2017 Alberto Martínez (https://github.com/aMarCruz)

[npm-image]:      https://img.shields.io/npm/v/uglify-es-brunch.svg
[npm-url]:        https://www.npmjs.com/package/uglify-es-brunch
[license-image]:  https://img.shields.io/npm/l/express.svg
[license-url]:    https://github.com/aMarCruz/uglify-es-brunch/blob/master/LICENSE
