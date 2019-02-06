[![NPM downloads](https://img.shields.io/npm/dm/@bbc/http-transport-rate-limiter.svg?style=flat)](https://npmjs.org/package/@bbc/http-transport-rate-limiter)
[![Build Status](https://api.travis-ci.org/bbc/http-transport-rate-limiter.svg)](https://travis-ci.org/bbc/http-transport-rate-limiter) 
![npm](https://img.shields.io/npm/v/@bbc/http-transport-rate-limiter.svg)
 ![license](https://img.shields.io/badge/license-MIT-blue.svg) 
![github-issues](https://img.shields.io/github/issues/bbc/http-transport-rate-limiter.svg)
![stars](https://img.shields.io/github/stars/bbc/http-transport-rate-limiter.svg)
![forks](https://img.shields.io/github/forks/bbc/http-transport-rate-limiter.svg)

# http-transport-rate-limiter
A global plugin for http-transport to utilise the [simple-rate-limiter](https://github.com/xavi-/node-simple-rate-limiter).

## Usage

Configure the plugin as shown below. You can then use it as a global plugin for http-transport.
```js
const simpleRateLimiterPlugin = require('@bbc/http-transport-rate-limiter')(count, duration);
```

The plugin takes two arguments:
- `count`: The amount of calls that are allowed per time window
- `duration`: The length of the time window to restrict calls within. In milliseconds.

### Example

```js
'use strict';

const url = 'http://example.com/';
const simpleRateLimiterPlugin = require('@bbc/http-transport-rate-limiter');

const client = require('@bbc/http-transport').createBuilder()
  .use(simpleRateLimiterPlugin(2, 1000)
  .createClient();

const res = await client
  .get(url)
  .asResponse();
 
if (res.statusCode === 200) {
  console.log(res.body);
}
```

