# tp-config

[![Build Status](https://www.travis-ci.org/typescript-practice/config.svg?branch=master)](https://www.travis-ci.org/typescript-practice/config)
[![Coverage Status](https://coveralls.io/repos/github/typescript-practice/config/badge.svg?branch=master)](https://coveralls.io/github/typescript-practice/config?branch=master)
[![npm version](https://img.shields.io/npm/v/tp-config.svg?style=flat-square)](https://www.npmjs.com/package/tp-config)
[![monthly downloads](https://img.shields.io/npm/dm/tp-config.svg?style=flat-square)](https://www.npmjs.com/package/tp-config)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![UNPKG](https://img.shields.io/badge/unpkg.com--green.svg)](https://unpkg.com/tp-config@latest/dist/config.umd.js)
[![liense](https://img.shields.io/github/license/typescript-practice/config.svg)]()

## Intro

The Config lets you configure your entire app.

## Example

```js
import Config from 'tp-config';

const config = new Config({
  testKey: testValue,
});

config.get('testKey') === 'testValue'; // true
```

## Install

[![NPM Badge](https://nodei.co/npm/tp-config.png?downloads=true)](https://www.npmjs.com/package/tp-config)

## API

### ```config.get(key, fallbackValue)```
Returns a single config value, given a key. 

* `@param {string} [key]` - the key for the config value
* `@param {any} [fallbackValue]` - a fallback value to use when the config value was not found, or is config value is `null`. Fallback value defaults to `null`.
* `@return {any}` 

```js
let config = new Config({
  testNum: 2,
  testFn: function (this: Config) {
    return `testFnReturnValue+${this.get("testNum")}`;
  }
});
expect(config.get("testNum")).toEqual(2);
expect(config.get("testFn")).toEqual("testFnReturnValue+2");
```

### ```config.getBoolean(key, fallbackValue)```

Same as `get()`, however always returns a boolean value. If the value from `get()` is `null`, then it'll return the `fallbackValue` which defaults to `false`. Otherwise, `getBoolean()` will return  if the config value is truthy or not. It also returns `true` if the config value was the string value `"true"`.

* `@param {string} [key]` - the key for the config value
* `@param {boolean} [fallbackValue]` - a fallback value to use when the config value was `null`. Fallback value defaults to `false`.

```js
let config = new Config({
  key1: true,
  key2: false
});
expect(config.getBoolean("key1")).toEqual(true);
expect(config.getBoolean("key2")).toEqual(false);
```

### ```config.getNumber(key, fallbackValue)```

Same as `get()`, however always returns a number value. Uses `parseFloat()` on the value received from `get()`. If the result from the parse is `NaN`, then it will return the value passed to `fallbackValue`. If no fallback value was provided then it'll default to returning `NaN` when the result is not a valid number.

* `@param {string} [key]` - the key for the config value
* `@param {number} [fallbackValue]` - a fallback value to use when the config value turned out to be `NaN`. Fallback value defaults to `NaN`.

```js
let config = new Config({
  key: 6
});
expect(config.getNumber("key")).toEqual(6);
```

### ```config.set(key, value)```

Sets a single config value.

* `@param {string} [key]` - The key used to look up the value at a later point in time.
* `@param {string} [value]` - The config value being stored.

```js
let config = new Config(null);
config.set("name", "Doc Brown");
config.set("occupation", "Weather Man");

expect(config.get("name")).toEqual("Doc Brown");
expect(config.get("occupation")).toEqual("Weather Man");
```

### ```config.settings()```

Get  all configs.

* `@return {object}` - Return all configs.

```js
let config = new Config({
  name: "Doc Brown",
  occupation: "Weather Man"
});

expect(config.settings()).toEqual({
  name: "Doc Brown",
  occupation: "Weather Man"
});
```

### ```config.settings(configs)```

Set(reset) all configs.

* `@param {object} [configs]` - The configs object will be reset
* `@return {object} this` - Return this value

```js
let config = new Config();
config.settings({
  name: "Doc Brown",
  occupation: "Weather Man"
});

expect(config.get("name")).toEqual("Doc Brown");
expect(config.get("occupation")).toEqual("Weather Man");
```

## Development

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)


## License

MIT
