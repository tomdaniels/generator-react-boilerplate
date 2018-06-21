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
        name: 'repository',
        message: 'git repository URL (if relevant)'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Project author'
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
    config: function() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.name,
          description: this.props.description,
          repository: this.props.repository,
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
      // Hack to get around npm's magic with .gitignore
      this.fs.copyTpl(
        this.templatePath('gitignore.txt'),
        this.destinationPath('.gitignore'),
        {}
      );
      this.fs.copyTpl(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig'),
        {}
      );
      this.fs.copyTpl(
        this.templatePath('.babelrc'),
        this.destinationPath('.babelrc'),
        {}
      );
      this.fs.copyTpl(this.templatePath('test/'), this.destinationPath('test/'), {});
      this.fs.copyTpl(this.templatePath('src/'), this.destinationPath('src/'), {});
      this.fs.copyTpl(this.templatePath('server/'), this.destinationPath('server/'), {});
      this.fs.copyTpl(this.templatePath('public/'), this.destinationPath('public/'), {});
    },

    install: function() {
      this.installDependencies({ bower: false, npm: true, yarn: true });
    }
  }
});
