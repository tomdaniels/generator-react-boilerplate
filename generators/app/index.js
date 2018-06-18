const yeoman = require('yeoman-generator');
// Const chalk = require('chalk');
// const ejs = require('ejs');
// const glob = require('glob');
// const mkdirp = require('mkdirp');
// const findParentDir = require('find-parent-dir');
// const fs = require('fs');
// const spawn = require('cross-spawn');
// const generatorPackageJson = require('../../package.json');
// const { FILE_DELIM_OPEN, FILE_DELIM_CLOSE } = require('../util/ejs-util');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
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
  },

  writing: {
    // Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.name
        }
      );

      // Copy application files
    },

    install: function() {
      this.installDependencies({ bower: false, npm: false, yarn: true });
    }
  }
});
