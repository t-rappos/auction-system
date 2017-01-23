module.exports = {
    "extends": "google",
    "env": {
        'es6': true,        // We are writing ES6 code
        'browser': true,    // for the browser
        'commonjs': true    // and use require() for stylesheets
    },
    "plugins": [
      "react"
    ],
    "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "rules": {
            "semi": 2
        },
  "extends": ["eslint:recommended", "plugin:react/recommended"]
};
