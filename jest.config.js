var preset = require("jest-preset-angular/jest-preset");
const esModules = ["@angular"].join("|");
module.exports = {
  ...preset,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  verbose: true,
  testMatch: ["**/*.spec.ts"],
  moduleDirectories: ["node_modules", "."],
  roots: ["<rootDir>/src"],
  globals: {
    ...preset.globals,
    "ts-jest": {
      ...preset.globals["ts-jest"],
      tsconfig: "tsconfig.spec.json",
      isolatedModules: true,
    },
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test_results",
        outputName: "obi-frontend-test-result.xml",
      },
    ],
  ],
  resolver: "jest-preset-angular/build/resolvers/ng-jest-resolver.js",
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  transform: {
    "^.+\\.(ts|js|mjs|html|svg)$": "jest-preset-angular",
  },
  setupFiles: ["jest-canvas-mock"],
  testRunner: "jest-jasmine2",
  // globalSetup: "jest-preset-angular/global-setup",
};
