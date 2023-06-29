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
        type: "input",
        name: "repository",
        message: "Existing repostiory URL",
        default: ""
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.props = answers;
    });
  }

  writing() {
    const { name, desc, repository, author } = this.props;
    [
      {
        path: "package.json",
        props: { name, desc, repository, author }
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

    this.spawnCommandSync("git", ["init", "--quiet"]);
    this.spawnCommandSync("git", ["add", "."]);
    this.spawnCommandSync("git", ["commit", "-m", "init :tada:", "--quiet"]);
  }
};
