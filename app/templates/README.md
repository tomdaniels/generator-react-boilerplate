# react-boilerplate

A homemade boilerplate for React applications.

## Out of the box?

- Webpack set up for local dev environment.
- Only requires to create React components and styling (all tooling taken care of).
- Has express server.js file for quick deployment once ready.
- Node server is set up through webpack already.

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

## How to use it

Download the file tree from Github.
```bash
git clone git@github.com:tomdaniels/react-boilerplate.git && cd react-boilerplate
```

1. Rename the directory within your local files (_instead of 'react-boilerplate'_)
2. `cd` into your new-file and make it your own (`rm -rf .git`)
3. Change the [app name](https://github.com/tomdaniels/react-boilerplate/blob/master/package.json#L2) and [repository url](https://github.com/tomdaniels/react-boilerplate/blob/master/package.json#L5) in package.json
4. Start coding in [landing.js](https://github.com/tomdaniels/react-boilerplate/blob/master/src/components/landing.js).

_maybe 5: I don't think there is any harm in not doing this, but if you create a repository update the [repository url](https://github.com/tomdaniels/react-boilerplate/blob/master/package.json#L5) again. It doesn't happen automatically._

To get it runnning, simply run the following commands once it's been cloned:
```bash
yarn install
yarn watch
```

## Testing?

Global config [settings](https://github.com/tomdaniels/react-boilerplate/blob/master/test/globals.js) are in place.

- Mocha
- Chai
- Enzyme

chai-enzyme package also set up so you can check for more simple things like:
`to.be.present()` where needed.
