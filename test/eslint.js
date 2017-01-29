
var lint = require('mocha-eslint');
var paths = ['lib','test','app/tests'];

var options = {

  // Only display warnings if a test is failing
  alwaysWarn: false,  // Defaults to `true`, always show warnings

  // Increase the timeout of the test if linting takes to long
  timeout: 5000,  // Defaults to the global mocha `timeout` option

  // Increase the time until a test is marked as slow
  slow: 1000,  // Defaults to the global mocha `slow` option

  // Consider linting warnings as errors and return failure
  strict: false  // Defaults to `false`, only notify the warnings
};

// Run the tests
lint(paths, options);
