# Sum-Metric-Service [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard) [![Build Status](https://travis-ci.org/jampies/Sum-Metric-Service.svg?branch=master)](https://travis-ci.org/jampies/Sum-Metric-Service)

A metric logging and reporting service that sums metrics by time window for the most recent hour

Travis CI: https://travis-ci.org/github/jampies/Sum-Metric-Service

Deployed here: https://sum-metric-service.now.sh

## Dependencies

* Node v8+ and NPM

## Starting it up

* `npm install` to install any other necessary dependencies
* `npm start` will bundle with webpack and run locally at port `3000`
* `npm test` runs the linter and the unit-tests
* `npm run unit-test` runs the unit tests only
* `npm run ss` checks the project for any linting issues according to the semistandardjs spec (https://github.com/standard/semistandard)
* `npm run ss:fix` Attempts to automatically fix and linting issues, and highlights the rest.

## Conventions

* Tests are located in the same folder as the component tested and has `.spec.js` extensions

## Known issues

* Performance could be improved by not filtering every value, but check

## License
MIT
