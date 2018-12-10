module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'react-app',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: '15.0', // React version, default to the latest React stable release
      flowVersion: '0.53' // Flow version
    },
    propWrapperFunctions: ['forbidExtraProps'] // The names of any functions used to wrap the
    // propTypes object, e.g. `forbidExtraProps`.
    // If this isn't set, any propTypes wrapped in
    // a function will be skipped.
  },
  env: {
    commonjs: true,
    node: true,
    es6: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'react/no-string-refs': 'off',
    'no-console': 'off',
    strict: ['error', 'global'],
    curly: 'warn'
  }
};
