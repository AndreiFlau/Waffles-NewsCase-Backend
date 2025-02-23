export const preset = "ts-jest";
export const testEnvironment = "node";
export const roots = ["<rootDir>/src", "<rootDir>/__tests__"];
export const testMatch = ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"];
export const transform = {
  "^.+\\.ts$": "ts-jest",
};
