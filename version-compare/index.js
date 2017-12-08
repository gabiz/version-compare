"use strict";

/**
 * compares two versions
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
let compareVersion = (version1, version2) => {
  validateVersionFormat(version1);
  validateVersionFormat(version2);

  // identical version optimization
  if (version1 === version2) {
    return 0;
  }

  return compareVersionAry(version1.split("."), version2.split("."));
};

function compareVersionAry(versionAry1, versionAry2) {
  if (versionAry1.length == 0 && versionAry2.length == 0) { return 0 }

  let entryInt1 = parseInt(versionAry1[0]) || 0;
  let entryInt2 = parseInt(versionAry2[0]) || 0;

  if (entryInt1 > entryInt2) {
    return 1;
  } else if (entryInt2 > entryInt1) {
    return -1;
  } else {
    // tail recursion
    return compareVersionAry(versionAry1.slice(1), versionAry2.slice(1));
  }
}

function validateVersionFormat(version) {
  if (typeof(version) !== "string") {
    throw new TypeError(`Expected string, got ${typeof version} (${version})`);
  }
  const VERS_REGEX = /^(\d+\.)?(\d+\.)+(\*|\d+)$|^(\d+)$/;
  if (!VERS_REGEX.test(version)) {
    throw new TypeError(`Expected version format, got ${version}`);
  }
}

module.exports = compareVersion
