const files = {
  PACKAGE_JSON: "package.json",
  README: "README.md",
  CHANGELOG: "CHANGELOG.md",
  PR_TEMPLATE: "PULL_REQUEST_TEMPLATE.md",
  GIT_IGNORE: "gitignore.txt",
  INDEX_HTML: "index.html",
  SRC: "src/"
};

const dependencies = new Map([
  [files.PACKAGE_JSON, ["name", "desc", "repositoryUrl", "author"]],
  [files.README, ["name", "desc", "pkgManager"]],
  [files.CHANGELOG, ["name", "desc"]],
  [files.INDEX_HTML, "name"],
  [files.SRC, "name"]
]);

module.exports = { files, dependencies };
