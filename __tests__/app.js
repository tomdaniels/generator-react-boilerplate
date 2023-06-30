"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

const { files } = require("../generators/app/utils/files");

let props;
let promptAnswers;

describe("generator-td-node-api-server:app", () => {
  beforeAll(() => {
    promptAnswers = {
      name: "some-api",
      desc: "some description",
      author: "Tom Daniels",
      git: true,
      repositoryUrl: "github.com"
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
    assert.file(
      Object.values(files).map(file =>
        file === files.GIT_IGNORE ? ".gitignore" : file
      )
    );
  });
});
