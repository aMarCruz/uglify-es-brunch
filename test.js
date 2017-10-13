/* eslint no-undef: 0 */
'use strict';

const expect = require('chai').expect;
const Plugin = require('.');

describe('uglify-es-brunch', () => {
  let plugin;

  beforeEach(() => {
    plugin = new Plugin(Object.freeze({
      plugins: {},
    }));
  });

  it('should have #optimize method', () => {
    expect(plugin).to.respondTo('optimize');
  });

  it('should compile and produce valid result', () => {
    const content = '(function() {var first = 5; window.second = first;})()';
    const expected = 'window.second=5;';

    return plugin.optimize({data: content})
      .then(data => {
        expect(data).to.eql({data: expected});
      });
  });

  it('should produce source maps', () => {
    plugin = new Plugin({plugins: {}, sourceMaps: true});

    const content = '(function() {var first = 5; window.second = first;})()';
    const expected = 'window.second=5;';
    const expectedMap = '{"version":3,"sources":["0"],"names":["window","second"],"mappings":"AAA4BA,OAAOC,OAAV","file":"file.js"}';

    return plugin.optimize({data: content, path: 'file.js'})
      .then(data => {
        expect(data.data).to.equal(expected);
        expect(data.map).to.equal(expectedMap);
      });
  });

  it('should ignore ignored files', () => {
    plugin = new Plugin({
      plugins: {
        uglify: {
          ignored: /ignoreMe\.js/,
        },
      },
    });

    const content = '(function() {var first = 5; window.second = first;})()';
    const expected = content;
    const map = 'someDummyMap';

    return plugin.optimize({data: content, path: 'ignoreMe.js', map})
      .then(data => {
        expect(data).to.eql({data: expected, map});
      });
  });

  it('should not ignore non-ignored files', () => {
    plugin = new Plugin({
      plugins: {
        uglify: {
          ignored: /ignoreMe\.js/,
        },
      },
    });

    const content = '(function() {var first = 5; window.second = first;})()';
    const expected = 'window.second=5;';

    return plugin.optimize({data: content, path: 'uglifyMe.js'})
      .then(data => {
        expect(data).to.eql({data: expected});
      });
  });
});
