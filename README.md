# generator-td-react-boilerplate [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> generator for td-react-boilerplate

## Installation

First, install [Yeoman](http://yeoman.io) and generator-td-react-boilerplate using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-td-react-boilerplate
```

Then generate your new project:

```bash
yo td-react-boilerplate
```

A homemade boilerplate for React applications.

## Out of the box?

- Webpack configured for both dev and prod environments.
- Jump right into landing.js and start your project.
- Has an express server.js file for quick deployment once ready.
- If you have issues with `yarn start` try `yarn build:dev` initially.

## The Setup

```
.
├── public
│   ├── dist
│   │   └── // webpack bundled code
│   ├── images
│   │   └── // static images
│   └── index.html
├── server
│   └── server.js
├── src
│   ├── js
│   │   ├── components
│   │   │   └── landing.js
│   │   └── app.js
│   └── scss
│       ├── general
│       │    ├── general.js
│       │    └── settings.scss
│       ├── partials
│       │   ├── // component styles go here
│       │   └── landing.js
│       └── styles.scss
├── test
│   ├── components
│   │   └── landing.js
│   ├── globals.js
│   └── mocha.opts
├── .babelrc
├── .editorconfig
├── .gitignore
├── CHANGELOG.md
├── package.json
├── PULL_REQUEST_TEMPLATE.md
├── README.md
├── webpack.config.js
└── yarn.lock
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

ISC © [tomdaniels](https://github.com/tomdaniels)


[npm-image]: https://badge.fury.io/js/generator-td-react-boilerplate.svg
[npm-url]: https://npmjs.org/package/generator-td-react-boilerplate
[travis-image]: https://travis-ci.org/tomdaniels/generator-td-react-boilerplate.svg?branch=master
[travis-url]: https://travis-ci.org/tomdaniels/generator-td-react-boilerplate
[daviddm-image]: https://david-dm.org/tomdaniels/generator-td-react-boilerplate.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tomdaniels/generator-td-react-boilerplate
