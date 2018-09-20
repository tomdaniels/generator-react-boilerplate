# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [1.6.1][] - 2018-09-20
### Changed
- bumped `td-eslint-config` with arrow-parens rules

### Fixed
- Removed file extension on import

## [1.6.0][] - 2018-09-20
### Changed
- Remove node-sass, swap to [emotion](https://github.com/emotion-js/emotion)

## [1.5.0][] - 2018-09-16
### Fixed
- eslintignore file for fresh install

## [1.4.0][] - 2018-09-16
### Added
- [td lint rules](https://github.com/tomdaniels/td-eslint-config)

## [1.3.3][] - 2018-08-31
### Added
- Travis CI integration

## [1.3.2][] - 2018-08-03
### Updated
- Readme 'How to use it' section update

## [1.3.1][] - 2018-07-11
### Fixed
- Filename for partials files under `src/scss` and file tree in README.md updated

## [1.3.0][] - 2018-07-10
### Changed
- Use the users app name on initially landing page and in html title element, for more personal experience.
- Now asks user if there is a repository that already exists, and ask for the URL only if the answer is yes

### Added
- Partials folder under `src/scss/` with dummy styles for demonstration purposes.
- Pull request template for actual generator
- Prompt for existing repository URL to add to end state package.json

### Removed
- Jest test suite.

## [1.2.8][] - 2018-06-19
### Fixed
- Readme fixes

## [1.2.7][] - 2018-06-19
### Changed
- Readme update

## [1.2.6][] - 2018-06-19
### Fixed
- .gitignore as txt file in template, copied to .gitignore in destination.

## [1.2.5][] - 2018-06-19
### Removed
- Prepublish check

## [1.2.4][] - 2018-06-19
### Changed
- version bump

## [1.2.3][] - 2018-06-19
### Fixed
- Updated modules failing nsp check.

## [1.2.2][] - 2018-06-19
### Changed
- change prompts phrasing

## [1.2.1][] - 2018-06-18
- change yeoman generator version.

## [1.2.0][] - 2018-06-18
### Fixed
- package-lock gitignore fix

## [1.1.0][] - 2018-06-18
### Added
- Take app name, description and author through command line
- Set up initial config file, write package.json.  

## [1.0.0][] - 2018-06-18
### Changed
- Re-written generator

## [0.6.0][] - 2018-06-18
### Fixed
- Pascalcase dependency
- eslint config

## [0.5.1][] - 2018-06-16
- fix version error

## [0.4.1][] - 2018-06-16
### Fixed
- filenaming

### Changed
- Prompt for component or app name

## [0.4.0][] - 2018-06-16
### Changed
- No default filename or special prefix

### Fixed
- Update dependancies

## [0.3.0][] - 2018-06-16
### Changed
- Added files property to package.json

## [0.2.0][] - 2018-06-16
### Fixed
- versioning push

## [0.1.0][] - 2018-06-16
- set up on Github
- Generator created


[Unreleased]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.6.1...HEAD
[1.6.1]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.3.3...v1.4.0
[1.3.3]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.3.2...v1.3.2
[1.3.2]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.8...v1.3.0
[1.2.8]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.7...v1.2.8
[1.2.7]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.6...v1.2.7
[1.2.6]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.5...v1.2.6
[1.2.5]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.3...v1.2.3
[1.2.3]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.1...v1.2.1
[1.2.1]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.6.0...v1.0.0
[0.6.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tomdaniels/generator-react-boilerplate/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/tomdaniels/generator-react-boilerplate/tree/v0.1.0
