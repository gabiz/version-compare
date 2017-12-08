var assert = require('assert');
var versionCompare = require('../version-compare');

describe('versionCompare()', () => {
  it('should throw error if version is not a string', () => {
    assert.throws(() => versionCompare(1.0, "1.0.0"), TypeError, "TypeError: Expected string, got number (2)");
  });

  it('should throw error if version format is invalid', () => {
    assert.throws(() => versionCompare("0.-1.0", "1.0.0"), TypeError, "Expected version format, got 0.-1.0");
    assert.throws(() => versionCompare("1.0.0", "0..0"), TypeError, "Expected version format, got 0..0");
    assert.throws(() => versionCompare("1.0.", "1.0.0"), TypeError, "Expected version format, got 1.0.");
    assert.throws(() => versionCompare("1.O.O", "1.0.0"), TypeError, "Expected version format, got 1.O.O");
    assert.throws(() => versionCompare("", "1.0.0"), TypeError, "Expected version format, got ");
  });

  it('should return 0 when the versions are identical', () => {
    assert.equal(versionCompare("1.0.0", "1.0.0"), 0);
    assert.equal(versionCompare( "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002",
                          "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002"), 0);
  });

  it('should return 0 when version1 is the same version2', () => {
    assert.equal(versionCompare("1.0", "1.0.0"), 0);
    assert.equal(versionCompare( "1.0",
                          "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0"), 0);
  });

  it('should return 1 when version1 > version2', () => {
    assert.equal(versionCompare("1.1.0", "1.0.0"), 1);
    assert.equal(versionCompare( "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1003",
                          "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002"), 1);
    assert.equal(versionCompare( "1.2.3.4.5.6.777.8.9.10.11.12.100.101.102.1000.1001.1002",
                          "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002"), 1);
    assert.equal(versionCompare( "1.2.3.4.5.6.777.8.9.10.11.12.100.101.102.1000.1001.1002",
                          "1.2.3.4.5.6.7"), 1);
    assert.equal(versionCompare( "1.2.3.4.5.6.777",
                          "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002"), 1);
  });

  it('should return -1 when the version1 < version2', () => {
    assert.equal(versionCompare("1.0.0", "1.0.1"), -1);
    assert.equal(versionCompare( "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002",
                          "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1003"), -1);
    assert.equal(versionCompare( "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002",
                          "1.2.3.4.5.6.777.8.9.10.11.12.100.101.102.1000.1001.1002"), -1);
    assert.equal(versionCompare( "1.2.3.4.5.6.7.8.9.10.11.12.100.101.102.1000.1001.1002",
                          "1.2.3.4.5.6.777"), -1);
    assert.equal(versionCompare( "1.2.3.4.5.6.7",
                          "1.2.3.4.5.6.777.8.9.10.11.12.100.101.102.1000.1001.1002"), -1);
  });

  it('should support required used cases', () => {
    assert.equal(versionCompare("1", "2"), -1);
    assert.equal(versionCompare("1.1", "1.1.2"), -1);
    assert.equal(versionCompare("1.0.0.0", "1.0"), 0);
    assert.equal(versionCompare("2.0", "10.0"), -1);
    assert.equal(versionCompare("0.1", "1.1"), -1);
    assert.equal(versionCompare("1.1", "1.2"), -1);
    assert.equal(versionCompare("1.2", "13.37"), -1);
  });
});
