# build-heroku
[![Build Status](https://travis-ci.org/vinsonchuong/build-heroku.svg?branch=master)](https://travis-ci.org/vinsonchuong/build-heroku)

Configures a Heroku static application

## Installing
`build-heroku` is available as an
[npm package](https://www.npmjs.com/package/build-heroku).

## Usage
Add `build-bin` and `build-heroku` to the `package.json`.

```json
{
  "name": "project",
  "private": true,
  "scripts": {
    "build": "build"
  },
  "devDependencies": {
    "build-bin": "^0.0.6",
    "build-heroku": "^0.0.1"
  }
}
```

From the command line, run:
```bash
npm run build
```

`build-heroku` will add a `static.json` to the `dist` directory,
configuring the
[staticbuildpack](https://github.com/heroku/heroku-buildpack-static) to
enable pushstate routing and force HTTPS.

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```
