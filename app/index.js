// yeoman expects underscore dangles for private methods
const yeoman = require('yeoman-generator');
const spawn = require('cross-spawn');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const cloneDeep = require('lodash/cloneDeep');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const commandExists = require('command-exists');
const findParentDir = require('find-parent-dir');
const generatorPackageJson = require('../package.json');
const pascalcase = require('../util/pascalcase');
const { feCoize, unFeCoize } = require('../util/fe-co');
const { FILE_DELIM_OPEN, FILE_DELIM_CLOSE } = require('../util/ejs-util');

const generatorVersion = generatorPackageJson.version;

module.exports = yeoman.extend({
  _customAppName() {
    const privateNpmRe = /@.*\/(.*)/;
    let appname = this._getPackageProp('name');
    let match;

    if (appname && appname.match(privateNpmRe)) {
      match = privateNpmRe.exec(appname);
      [, appname] = match;
    }

    if (!appname) {
      appname = path.basename(this.destinationRoot());
    }

    return appname;
  },

  _packageAuthor() {
    let user = '';
    if (this.user.git.name()) {
      user += this.user.git.name();
      if (this.user.git.email()) {
        user += ` <${this.user.git.email()}>`;
      }
    }
    return user;
  },

  _getPackageProp(property) {
    return this.fs.readJSON(this.destinationPath('package.json'), {})[property];
  },

  initializing() {
    if (!commandExists.sync('yarn')) {
      // Hard fail without yarn.
      this.env.error(
        chalk.bold.red(
          'Error: Components require Yarn.\nInstallation: https://yarnpkg.com/en/docs/install',
        ),
      );
      return;
    }

    this.appname = this._customAppName();
  },

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'feComponent',
        message:
          'Your component name. You can either prefix it with fe-co, or the generator will do it for you',
        default: feCoize(this.appname), // Default to current folder name
      },
      {
        type: 'input',
        name: 'description',
        message: 'Write a brief description for your component?',
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is your name?',
        store: true,
        default: this._packageAuthor(),
      },
      {
        type: 'confirm',
        name: 'autoLoad',
        message: 'Auto load the component demo URL after generation?',
        store: true,
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      const newProps = cloneDeep(props);
      newProps.feComponent = feCoize(props.feComponent);
      newProps.component = unFeCoize(props.feComponent);
      newProps.componentCC = pascalcase(newProps.component);
      newProps.generatorVersion = generatorVersion;
      this.props = newProps;
    });
  },

  writing() {
    // gitignore needs to be copied to .gitignore
    // We can't have .gitignore in the templates folder because
    // npm decides to do some magic and doesn't publish it
    const dotFileGlob = 'gitignore';
    // eslint-disable-next-line prefer-template
    const namedTemplateGlob = `./**/*${FILE_DELIM_OPEN}*${FILE_DELIM_CLOSE}*`;
    const templates = glob.sync('./**/*', {
      cwd: this.sourceRoot(),
      nodir: true,
      dot: true,
      ignore: [
        // eslint-disable-next-line prefer-template
        './**/' + dotFileGlob,
        namedTemplateGlob,
        './**/node_shrinkwrap/**/*',
      ],
    });
    const dirs = glob.sync('./**/*/', {
      cwd: this.sourceRoot(),
      dot: true,
    });
    const dotTemplates = glob.sync(dotFileGlob, {
      cwd: this.sourceRoot(),
      dot: true,
    });
    const namedTemplates = glob.sync(namedTemplateGlob, {
      cwd: this.sourceRoot(),
      dot: true,
    });

    dirs.forEach((file) => {
      mkdirp(this.destinationPath(file));
    });

    templates.forEach((file) => {
      const renderedFile = ejs.render(file, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(renderedFile),
        this.props,
      );
    });

    dotTemplates.forEach((file) => {
      const renderedFile = ejs.render(file, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        // eslint-disable-next-line prefer-template
        this.destinationPath('.' + renderedFile),
        this.props,
      );
    });

    namedTemplates.forEach((file) => {
      const ejsFile = file
        .replace(FILE_DELIM_OPEN, '<%')
        .replace(FILE_DELIM_CLOSE, '%>');
      const renderedFile = ejs.render(ejsFile, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(renderedFile),
        this.props,
      );
    });
  },

  install() {
    this.installDependencies({ bower: false, npm: false, yarn: true });
  },

  end() {
    // Callback to squelch error messages from symlink already created
    // Should probably move the symlinking into a postinstall step for these packages instead
    // Jess doesn't like auto symlinking anyway (but I do) -Alex
    fs.symlink(
      'node_modules/@domain-group/fe-lint-scss/scsslintrc',
      this.destinationPath('.scss-lint.yml'),
      () => {},
    );

    // unlink and delete onld symlinks from boilerplate <= 2.3.6
    // TODO remove unlink in boilerplate@3
    fs.unlink(this.destinationPath('.eslintrc'), () => {});
    fs.unlink(this.destinationPath('.eslintignore'), () => {});

    let gitDir = null;
    try {
      gitDir = findParentDir.sync(process.cwd(), '.git');
    } catch (error) {
      gitDir = null;
    }

    if (gitDir === null) {
      spawn.sync('git', ['init'], { stdio: 'inherit' });
      spawn.sync('git', ['add', '-A'], { stdio: 'inherit' });
      spawn.sync(
        'git',
        [
          'commit',
          '-am',
          `"Initial commit from ${generatorPackageJson.name}@${
            generatorPackageJson.version
          }"`,
        ],
        { stdio: 'inherit' },
      );
      spawn.sync('git', ['checkout', '-b', 'develop'], { stdio: 'inherit' });
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `Skipping git initialization. .git folder found in parent directory [${gitDir}]`,
      );
    }

    // Prompt the user to update if there are potentially new versions available
    spawn.sync('yarn', ['outdated'], { stdio: 'inherit' });

    console.log(chalk.green.bold('\n\n🎉 Success 🎉')); // eslint-disable-line no-console

    if (this.props.autoLoad) {
      spawn('yarn', ['start'], { stdio: 'inherit' });
    } else {
      // Leading and trailing spaces important to differentiate output
      // eslint-disable-next-line no-console
      console.log(`

Get started:
- yarn start
- visit http://localhost:3000
      `);
    }
  },
});
