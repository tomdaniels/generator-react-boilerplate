# generator-td-react-boilerplate [![Build Status](https://travis-ci.com/tomdaniels/generator-react-boilerplate.svg?branch=master)](https://travis-ci.com/tomdaniels/generator-react-boilerplate) [![NPM version][npm-image]][npm-url]

- generator for [td-react-boilerplate](https://www.npmjs.com/package/td-react-boilerplate)

## How to use it

All you need to do is create a directory based on your project/component name, and let the generator do the rest!

```bash
mkdir fe-component && cd fe-component
npx -p yo -p generator-td-react-boilerplate -c 'yo td-react-boilerplate'
```

## Out of the box?

- Webpack configured for both dev and prod environments.
- Uses [emotion](https://github.com/emotion-js/emotion) to leverage css inline with javascript
- lint with common rules already configured
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
│   └── styles
│       ├── // see [emotion](https://github.com/emotion-js/emotion) if this is not familiar
│       └── landing.js
├── test
│   ├── components
│   │   └── landing.js
│   ├── globals.js
│   └── mocha.opts
├── .babelrc
├── .editorconfig
├── .eslintignore
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
