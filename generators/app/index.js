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
        message: 'Project author'
      },
      {
        type: 'confirm',
        name: 'repositoryConfirm',
        message: 'Is there an existing repository for this project?',
        default: false
      }
    ];
    const repositoryUrlPrompt = [
      {
        type: 'input',
        name: 'repository',
        message: 'Enter the repository URL'
      }
    ];

    this.prompt(
      prompts,
      function(answers) {
        if (answers.repositoryConfirm) {
          this.prompt(
            repositoryUrlPrompt,
            function(repository) {
              // The below declaration is a bit of a hack.
              // I'm not sure why but repository is being stored as a nested obect.
              const repositoryUrl = repository.repository;
              const responses = {
                ...answers,
                repository: repositoryUrl
              };
              this.props = responses;
              done();
            }.bind(this)
          );
        } else {
          this.props = answers;
          done();
        }
      }.bind(this)
    );
  },

  writing: {
    config: function() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.name.split(' ').join('-'),
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
        this.templatePath('.eslintignore'),
        this.destinationPath('.eslintignore'),
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
      this.fs.copyTpl(this.templatePath('src/'), this.destinationPath('src/'), {
        name: this.props.name
      });
      this.fs.copyTpl(this.templatePath('server/'), this.destinationPath('server/'), {});
      this.fs.copyTpl(this.templatePath('public/'), this.destinationPath('public/'), {
        name: this.props.name
      });
    },

    install: function() {
      this.installDependencies({ bower: false, npm: true, yarn: true });
    }
  }
});
