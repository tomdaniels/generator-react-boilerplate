const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const pkgVersion = require('../package.json').version;

describe('Boilerplate generator: bootstrap', () => {
  const promtArgs = {
    feComponent: 'test-boilerplate',
    description: 'My description',
    basePath: 'test-server-basepath',
    team: 'Phoenix',
    author: 'John Doe',
    autoLoad: false,
  };

  before(function bootstrap() {
    this.timeout(0);
    return helpers.run(require.resolve('../app')).withPrompts(promtArgs);
  });

  it('should create a `package.json` file with given data', () => {
    assert.jsonFileContent('package.json', {
      name: `@domain-group/fe-co-${promtArgs.feComponent}`,
      generatorVersion: pkgVersion,
      description: promtArgs.description,
      author: promtArgs.author,
      repository: {
        url: `git+ssh://git@github.com/domain-group/fe-co-${
          promtArgs.feComponent
        }.git`,
      },
      bugs: {
        url: `https://github.com/domain-group/fe-co-${
          promtArgs.feComponent
        }/issues`,
      },
      homepage: `https://github.com/domain-group/fe-co-${
        promtArgs.feComponent
      }#readme`,
    });
  });

  it('should create a `README.md` file with given data', () => {
    assert.fileContent('README.md', promtArgs.description);
    assert.fileContent('README.md', promtArgs.feComponent);
    assert.fileContent(
      'README.md',
      `https://github.com/domain-group/fe-boilerplate-generator/tree/v${pkgVersion}#code-architecture`,
    );
  });

  it('should create configuration files', () => {
    assert.file('.febuildrc');
    assert.file('.editorconfig');
    assert.file('.gitattributes');
    assert.file('.remarkignore');
    assert.file('CHANGELOG.md');
    assert.file('.circleci/config.yml');
    assert.file('.circleci/install-deps.sh');
    assert.file('.nvmrc');
    assert.file('.gitignore');
    assert.file('package.json');
    assert.file('PULL_REQUEST_TEMPLATE.md');
  });

  it('should create test setup files', () => {
    assert.file('test/.eslintrc');
    assert.file(`test/${promtArgs.feComponent}.js`);
  });

  it('should create src content files', () => {
    assert.file('src/demo/export.js');
    assert.file('src/demo/styles.scss');

    assert.file('src/fixtures/index.js');
    assert.file('src/js/export.js');
    assert.file(`src/js/${promtArgs.feComponent}.js`);
    assert.file('src/scss/styles.scss');
    assert.file('src/static/.gitignore');
  });
});
