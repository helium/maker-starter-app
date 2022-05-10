module.exports = {
  root: true,
  extends: [
    "./node_modules/@ff/libs/eslint/eslint.base.config.js",
    "./node_modules/@ff/libs/eslint/eslint.react-native.config.js",
  ],
  rules: {
    // TODO: Errors under temporary overridden rules should be fixed and rules to be removed in favour of the default config.
    "no-empty-function": "warn",
    "no-prototype-builtins": "warn",
    "import/namespace": "warn",
    "import/no-default-export": "warn",
    "import/no-named-as-default-member": "warn",
    "import/no-unresolved": "warn",
    "react/jsx-no-bind": "warn",
    "react-memo/require-memo": "warn",
    "react-memo/require-usememo": "warn",
    "react-native/no-inline-styles": "warn",
    "react-native/no-color-literals": "warn",
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      extends: "./node_modules/@ff/libs/eslint/eslint.typescript.config.js",
      rules: {
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-use-before-define": "warn",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/naming-convention": "warn",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-misused-promises": "warn",
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/unbound-method": "warn",
        "@typescript-eslint/no-empty-function": "warn",
      },
    },
    {
      files: ["jest.*", "**/__mocks__/**", "**/*{spec,test}.{t,j}s?(x)"],
      extends: "./node_modules/@ff/libs/eslint/eslint.jest.config.js",
    },
  ],
};
