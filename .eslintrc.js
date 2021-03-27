module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars-experimental": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    curly: "error",
    eqeqeq: "error",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
