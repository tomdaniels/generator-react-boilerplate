module.exports = ctx => [
  {
    type: "input",
    name: "name",
    message: "Your project name",
    default: ctx.appname.replace(" ", "-")
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
    default: "",
    when: answers => answers.git
  }
];
