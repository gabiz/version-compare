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

  let [verAry1, verAry2] = [version1, version2].map((v) => v.split("."))
  let size = Math.max(verAry1.length, verAry2.length)

  for (let index = 0; index < size; index++) {
      let entry1 = parseInt(verAry1[index]) || 0;
      let entry2 = parseInt(verAry2[index]) || 0;
      // bail as soon as we have a result
      if (entry1 > entry2) {
        return 1;
      } else if (entry2 > entry1){
        return -1;
      }
  }
  return 0;
};

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
