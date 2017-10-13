'use strict';

const uglify = require('uglify-es');

const allowedOpts = [
  'ecma', 'warnings', 'parse', 'compress', 'mangle', 'output',
  'toplevel', 'nameCache', 'ie8'
];

const cloneOptions = src => allowedOpts.reduce((dest, prop) => {
  if (prop in src) dest[prop] = src[prop];
  return dest;
}, {});

const formatError = (error) => {
  const err = new Error(`L${error.line}:${error.col} ${error.message}`);
  err.name = '';
  err.stack = error.stack;
  return err;
};

class UglifyESOptimizer {

  constructor(config) {
    this.options = Object.assign({}, config.plugins.uglify);
    this.options.sourceMap = !!config.sourceMaps;
  }

  optimize(file) {
    const data = file.data;
    const path = file.path;
    const opts = cloneOptions(this.options)

    try {
      if (this.options.ignored && this.options.ignored.test(file.path)) {
        // ignored file path: return non minified
        const result = {
          data,
          // brunch passes in a SourceMapGenerator object, but wants a string back.
          map: file.map ? file.map.toString() : null,
        };
        return Promise.resolve(result);
      }
    } catch (e) {
      return Promise.reject(`error checking ignored files to uglify ${e}`);
    }

    if (this.options.sourceMap) {
      debugger
      opts.sourceMap = {
        filename: path,
        url: `${path}.map`
      }
      if (file.map) {
        opts.sourceMap.content = file.map.toJSON();
      }
    }

    const optimized = uglify.minify(data, opts);

    if (optimized.error) {
      return Promise.reject(optimized.error);
    }

    const result = optimized && opts.sourceMap ? {
      data: optimized.code,
      map: optimized.map,
    } : {
      data: optimized.code,
    };

    result.data = result.data.replace(/\n\/\/# sourceMappingURL=\S+$/, '');

    return Promise.resolve(result);
  }
}

UglifyESOptimizer.prototype.brunchPlugin = true;
UglifyESOptimizer.prototype.type = 'javascript';

module.exports = UglifyESOptimizer;
