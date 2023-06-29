"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

let props;
let promptAnswers;

describe("generator-td-node-api-server:app", () => {
  beforeAll(() => {
    promptAnswers = {
      name: "some-api",
      desc: "some description",
      author: "Tom Daniels",
      repository: "github.com"
    };
    props = promptAnswers;
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(promptAnswers);
  });

  it("should store prompt answers on props object", () => {
    expect(props).toEqual(promptAnswers);
  });

  it("generates the web app", () => {
    assert.file([
      "index.html",
      ".gitignore",
      "package.json",
      "README.md",
      "CHANGELOG.md",
      "PULL_REQUEST_TEMPLATE.md",
      "src/index.js",
      "src/components/app.js"
    ]);
  });
});
