[![npm][npm-image]][npm-url]
[![License][license-image]][license-url]

# uglify-es-brunch

Adds [UglifyES](https://github.com/mishoo/UglifyJS2/tree/harmony) support to
[brunch](http://brunch.io).

The plugin will minify your javascript files (ES5, ES6 and higher).

## Usage

Only manual install, add this to your package.json:

```
"uglify-es-brunch": "aMarCruz/uglify-es-brunch"`
```

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

Copyright (c) 2017-2018 Alberto Martínez (https://github.com/aMarCruz)

[npm-image]:      https://img.shields.io/npm/v/uglify-es-brunch.svg
[npm-url]:        https://www.npmjs.com/package/uglify-es-brunch
[license-image]:  https://img.shields.io/npm/l/express.svg
[license-url]:    https://github.com/aMarCruz/uglify-es-brunch/blob/master/LICENSE
