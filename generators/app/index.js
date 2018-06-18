'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const ejs = require('ejs');
const glob = require('glob');
const mkdirp = require('mkdrip');
const findParentDir = require('find-parent-dir');
const fs = require('fs');
const spawn = require('cross-spawn');
const generatorPackageJson = require('../../package.json');
const { FILE_DELIM_OPEN, FILE_DELIM_CLOSE } = require('../util/ejs-util');

module.exports = class extends Generator {
  prompting() {
    const done = this.async();
    this.prompt(
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        // Defaults to the project's folder name if the input is skipped
        default: this.appname
      },
      function(answers) {
        this.props = answers;
        this.log(answers.name);
        done();
      }.bind(this)
    );
  }

  writing() {
    // Gitignore needs to be copied to .gitignore
    // We can't have .gitignore in the templates folder because
    // npm decides to do some magic and doesn't publish it
    const dotFileGlob = 'gitignore';
    // eslint-disable-next-line prefer-template
    const namedTemplateGlob = `./**/*${FILE_DELIM_OPEN}*${FILE_DELIM_CLOSE}*`;
    const templates = glob.sync('./**/*', {
      cwd: this.sourceRoot(),
      nodir: true,
      dot: true,
      ignore: ['./**/' + dotFileGlob, namedTemplateGlob, './**/node_shrinkwrap/**/*']
    });
    const dirs = glob.sync('./**/*/', {
      cwd: this.sourceRoot(),
      dot: true
    });
    const dotTemplates = glob.sync(dotFileGlob, {
      cwd: this.sourceRoot(),
      dot: true
    });
    const namedTemplates = glob.sync(namedTemplateGlob, {
      cwd: this.sourceRoot(),
      dot: true
    });

    dirs.forEach(file => {
      mkdirp(this.destinationPath(file));
    });

    templates.forEach(file => {
      const renderedFile = ejs.render(file, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(renderedFile),
        this.props
      );
    });

    dotTemplates.forEach(file => {
      const renderedFile = ejs.render(file, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        // eslint-disable-next-line prefer-template
        this.destinationPath('.' + renderedFile),
        this.props
      );
    });

    namedTemplates.forEach(file => {
      const ejsFile = file.replace(FILE_DELIM_OPEN, '<%').replace(FILE_DELIM_CLOSE, '%>');
      const renderedFile = ejs.render(ejsFile, this.props);
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(renderedFile),
        this.props
      );
    });
  }

  install() {
    this.installDependencies({ bower: false, npm: false, yarn: true });
  }

  end() {
    // Callback to squelch error messages from symlink already created
    // Should probably move the symlinking into a postinstall step for these packages instead
    // Jess doesn't like auto symlinking anyway (but I do) -Alex
    fs.symlink(
      'node_modules/@domain-group/fe-lint-scss/scsslintrc',
      this.destinationPath('.scss-lint.yml'),
      () => {}
    );

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
          }"`
        ],
        { stdio: 'inherit' }
      );
      spawn.sync('git', ['checkout', '-b', 'develop'], { stdio: 'inherit' });
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `Skipping git initialization. .git folder found in parent directory [${gitDir}]`
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
  }
};
