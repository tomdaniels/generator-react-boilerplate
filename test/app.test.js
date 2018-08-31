'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

let props;
let prompts;

describe('generator-td-node-api-server:app', () => {
  beforeAll(() => {
    prompts = [
      {
        name: 'some-api',
        description: 'some description',
        author: 'Tom Daniels',
        repositoryConfirm: false
      }
    ];
    props = prompts;
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(prompts);
  });

  it('should store prompt answers on props object', () => {
    expect(props.name).toEqual(prompts.name);
    expect(props.description).toEqual(prompts.description);
    expect(props.author).toEqual(prompts.author);
    expect(props.repositoryConfirm).toBe(prompts.repositoryConfirm);
  });

  it('generates the boilerplate', () => {
    assert.file(['webpack.config.js']);
    assert.file(['README.md']);
    assert.file(['PULL_REQUEST_TEMPLATE.md']);
    assert.file(['package.json']);
    assert.file(['.gitignore']);
    assert.file(['CHANGELOG.md']);
    assert.file(['.editorconfig']);
    assert.file(['.babelrc']);
    assert.file(['test/mocha.opts']);
    assert.file(['test/globals.js']);
    assert.file(['test/components/landing.js']);
    assert.file(['src/js/app.js']);
    assert.file(['src/js/components/landing.js']);
    assert.file(['src/scss/styles.scss']);
    assert.file(['src/scss/partials/_landing.scss']);
    assert.file(['src/scss/general/_settings.scss']);
    assert.file(['src/scss/general/_general.scss']);
    assert.file(['server/server.js']);
    assert.file(['public/index.html']);
    assert.file(['public/images/loader.gif']);
    assert.file(['public/images/favicon.png']);
  });
});
