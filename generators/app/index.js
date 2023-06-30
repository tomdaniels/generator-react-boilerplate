"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const pick = require("lodash/pick");

const prompts = require("./utils/prompts");
const { files, dependencies } = require("./utils/files");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("npm");
  }

  prompting() {
    greeting.bind(this).call();
    return this.prompt(prompts(this)).then(answers => {
      this.props = {
        ...answers,
        repositoryUrl: answers.repositoryUrl || "",
        pkgManager: this.options.npm ? "npm" : "yarn"
      };
    });
  }

  writing() {
    Object.values(files).forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file === files.GIT_IGNORE ? ".gitignore" : file),
        pick(this.props, dependencies.get(file))
      );
    });
  }

  install() {
    if (this.options.npm) {
      this.npmInstall();
    } else {
      this.yarnInstall();
    }

    if (this.props.git) {
      this.spawnCommandSync("git", ["init", "--quiet"]);
      this.spawnCommandSync("git", ["add", "."]);
      this.spawnCommandSync("git", ["commit", "-m", "init :tada:", "--quiet"]);
    }
  }
};

function greeting() {
  this.log(
    yosay(
      `Welcome to the unreal ${chalk.red("td-react-boilerplate")} generator!`
    )
  );
}
