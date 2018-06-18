const yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    const done = this.async();
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        // Defaults to the project's folder name if the input is skipped
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Write a brief description for your component?'
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is your name?'
      }
    ];

    this.prompt(
      prompts,
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
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.name,
          description: this.props.description,
          author: this.props.author
        }
      );
      this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
        name: this.props.name
      });
      this.fs.copyTpl(
        this.templatePath('CHANGELOG.md'),
        this.destinationPath('CHANGELOG.md'),
        {
          name: this.props.name
        }
      );
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'),
        {}
      );
      this.fs.copyTpl(
        this.templatePath('PULL_REQUEST_TEMPLATE.md'),
        this.destinationPath('PULL_REQUEST_TEMPLATE.md'),
        {}
      );

      // Copy application files
    },

    install: function() {
      this.installDependencies({ bower: false, npm: true, yarn: true });
    }
  }
});
