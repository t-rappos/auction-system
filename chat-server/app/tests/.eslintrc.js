module.exports = {
    "extends": [
        "google",
        "eslint:recommended",
       "plugin:react/recommended",
       "plugin:import/errors",
       "plugin:import/warnings"
     ],
    "env": {
        'es6': true,        // We are writing ES6 code
        'browser': true,    // for the browser
        'commonjs': true,    // and use require() for stylesheets
        "node": true,
        "jasmine": true
    },
    "plugins": [
      "react",
      "import",
      "mocha"
    ],
    "settings": {
      "react": {
        "createClass": "createClass", // Regex for Component Factory to use, default to "createClass"
        "pragma": "React",  // Pragma to use, default to "React"
        "version": "15.0" // React version, default to the latest React stable release
      }
    },
    "globals": {
      "React": true,
      "$": true
    },
    "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "rules": {
            "semi": 2,
            "no-console": 1,
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "mocha/no-exclusive-tests":"error",
            "mocha/no-skipped-tests":"error",
            "mocha/no-pending-tests":"error",
            "mocha/handle-done-callback":"error",
            "mocha/no-synchronous-tests":"error",
            "mocha/no-global-tests":"error",
            "mocha/no-return-and-callback":"error",
            "mocha/valid-test-description":"error",
            "mocha/valid-suite-description":"error",
            "mocha/no-sibling-hooks":"error",
            "mocha/no-mocha-arrows":"error",
            "mocha/no-hooks":"error",
            "mocha/no-hooks-for-single-case":"error",
            "mocha/no-top-level-hooks":"error",
            "mocha/no-identical-title":"error",
            "mocha/max-top-level-suites":"error",
            "mocha/no-nested-tests":"error"
        },

};
