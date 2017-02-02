module.exports = {
    "extends": [
        "google",
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
     ],
    "env": {
        'es6': true,        // We are writing ES6 code
        "node": true,
        "jasmine": true
    },
    "plugins": [
      "node",
      "import",
      "mocha"
    ],
    "settings": {

    },
    "globals": {

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
            "mocha/no-nested-tests":"error",
            "node/no-unpublished-require" : 0,
        },

};
