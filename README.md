# version-compare

[![Build Status](https://api.travis-ci.org/gabiz/version-compare.svg)](https://travis-ci.org/gabiz/version-compare)

Simple package for versioning comparison in JS.

A version is a string with a format like `1.0.0`. It can have an arbitrary subversions, which can be useful when tracking internal development packages.

Examples:

* 1 < 2
* 1.1 < 1.1.2
* 1.0.0.0 = 1.0
* 2.0 < 10.0

If a version is provided in an invalid format the function throws and exception `TypeError`.

## Usage

The function `versionCompare(version1, version2)` compares two versions and returns `0` if the same, `1` if `version1 > version2` or `-1` if `version1 < version2`

```javascript
var versionCompare = require('version-compare');

// ...
if (versionCompare(highVersion, lowVersion) >= 0) {
  // ...
}

```

## Test

Run:

```
$ npm test
```
