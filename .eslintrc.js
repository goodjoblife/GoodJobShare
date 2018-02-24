module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
    "prettier/react"
  ],
  "plugins": [
    "react",
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "always-multiline"],
    "react/prefer-stateless-function": "warn",
    "no-underscore-dangle": "off",
    "no-console": "warn",
    "import/no-extraneous-dependencies": "warn",
    "react/forbid-prop-types": "off",
    "react/display-name": "off",
    "prettier/prettier": [
      "error", {
        "trailingComma": "es5",
        "singleQuote": true
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": __dirname + "/webpack.config.base.js"
      }
    }
  }
};
