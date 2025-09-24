// Import the recommended configurations from ESLint and Jest
const eslint = require('@eslint/js');
const globals = require('globals');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  // Use the standard recommended ESLint rules
  eslint.configs.recommended,
  {
    // Define the files to apply this configuration to
    files: ["**/*.js"],
    // Configure parser options, environment variables, and global variables
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
      }
    },
    // Define a set of rules for the linter
    rules: {
      "indent": ["error", 2],
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  },
  // Add Jest-specific rules from the plugin
  jestPlugin.configs['flat/recommended']
];