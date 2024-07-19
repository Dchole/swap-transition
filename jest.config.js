// jest.config.js
export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        // ts-jest configuration options here
        useESM: true
      }
    ]
  },
  moduleFileExtensions: ["ts", "js"],
  extensionsToTreatAsEsm: [".ts"]
};
