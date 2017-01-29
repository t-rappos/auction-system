module.exports = {
    "extends": [
        "google",
      "eslint:recommended",
       "plugin:react/recommended"
     ],
    "env": {
        'es6': true,        // We are writing ES6 code
        'browser': true,    // for the browser
        'commonjs': true,    // and use require() for stylesheets
        "node": true,
        "jasmine": true
    },
    "plugins": [
      "react"
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
        },

};
