module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "google",
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:flowtype/recommended"
     ],
    "env": {
        'es6': true,        // We are writing ES6 code
        "node": true,
        "jasmine": true
    },
    "plugins": [
      "node",
      "import", 
      "flowtype"
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
            "node/no-unsupported-features" : 0,
            "node/no-unpublished-require" : 0,
            "flowtype/space-before-type-colon": [2, "never"],
        },

};
