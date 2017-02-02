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
      "import"
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
            "no-console": 1
        },

};
