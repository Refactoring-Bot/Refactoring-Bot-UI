module.exports = {
    preset: "ts-jest",
    globals: {
        "vue-jest": {
            babelConfig: false
        }
    },
    testURL: "http://localhost",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "json", "vue"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    transform: {
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFiles: ["<rootDir>/test/_setup.ts"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,vue}", "!**/node_modules/**"],
    coverageReporters: ["html", "text-summary"]
};
