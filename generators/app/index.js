"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Welcome to the unreal ${chalk.red("td-react-boilerplate")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname.replace(" ", "-")
      },
      {
        type: "input",
        name: "desc",
        message: "Write a brief description for your component?"
      },
      {
        type: "input",
        name: "author",
        message: "Project author"
      },
      {
        type: "confirm",
        name: "git",
        message: "Initialise as a git repsitory?",
        defult: false
      },
      {
        type: "input",
        name: "repositoryUrl",
        message: "Enter a repository url?",
        when: answers => answers.git
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.props = answers;
    });
  }

  writing() {
    const { name, desc, repositoryUrl, author } = this.props;
    [
      {
        path: "package.json",
        props: { name, desc, repositoryUrl, author }
      },
      {
        path: "README.md",
        props: { name, desc }
      },
      {
        path: "CHANGELOG.md",
        props: { name, desc }
      },
      {
        path: "PULL_REQUEST_TEMPLATE.md"
      },
      {
        path: "gitignore.txt",
        destination: ".gitignore"
      },
      {
        path: "index.html",
        props: { name }
      },
      {
        path: "src/",
        props: { name }
      }
    ].forEach(({ path, props = {}, destination }) => {
      this.fs.copyTpl(
        this.templatePath(path),
        this.destinationPath(destination || path),
        props
      );
    });
  }

  install() {
    this.yarnInstall();

    if (this.props.git) {
      this.spawnCommandSync("git", ["init", "--quiet"]);
      this.spawnCommandSync("git", ["add", "."]);
      this.spawnCommandSync("git", ["commit", "-m", "init :tada:", "--quiet"]);
    }
  }
};
