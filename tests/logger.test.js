describe("Logger Configuration", () => {
  beforeEach(() => {
    // Clear environment variables before each test
    delete process.env.PUPPETCHEF_DEBUG;
    delete process.env.PUPPETCHEF_INFO;
    delete process.env.PUPPETCHEF_LOGFILE;
    delete process.env.PUPPETCHEF_LOGLEVEL;
    jest.resetModules();
  });

  it("should add a debug transport when PUPPETCHEF_DEBUG is set to 1", () => {
    process.env.PUPPETCHEF_DEBUG = "1";
    const { logger } = require("../src/logger.js");

    expect(logger.transports.some((t) => t.level === "debug")).toBe(true);
  });

  it("should add an info transport when PUPPETCHEF_INFO is set to 1", () => {
    process.env.PUPPETCHEF_INFO = "1";
    const { logger } = require("../src/logger.js");

    expect(logger.transports.some((t) => t.level === "info")).toBe(true);
  });

  it("should add an info transport when PUPPETCHEF_LOGLEVEL is set to 'info'", () => {
    process.env.PUPPETCHEF_LOGLEVEL = "info";
    const { logger } = require("../src/logger.js");

    expect(logger.transports.some((t) => t.level === "info")).toBe(true);
  });

  it("should add a debug transport when PUPPETCHEF_LOGLEVEL is set to 'DEBUG'", () => {
    process.env.PUPPETCHEF_LOGLEVEL = "DEBUG";
    const { logger } = require("../src/logger.js");
    expect(logger.transports.some((t) => t.level === "debug")).toBe(true);
  });

  it("should add a debug transport when PUPPETCHEF_LOGLEVEL is set to 'DEBUG' even if PUPPETCHEF_INFO is set", () => {
    process.env.PUPPETCHEF_LOGLEVEL = "DEBUG";
    process.env.PUPPETCHEF_INFO = "1";
    const { logger } = require("../src/logger.js");
    expect(logger.transports.some((t) => t.level === "debug")).toBe(true);
  });

  it("should log to a file when both PUPPETCHEF_DEBUG and PUPPETCHEF_LOGFILE are set", () => {
    process.env.PUPPETCHEF_DEBUG = "1";
    process.env.PUPPETCHEF_LOGFILE = "/tmp/puppetchef.log";
    const { logger } = require("../src/logger.js");

    expect(
      logger.transports.some(
        (t) => t.filename === "puppetchef.log" && t.dirname === "/tmp",
      ),
    ).toBe(true);
  });

  it("should log to a file when both PUPPETCHEF_INFO and PUPPETCHEF_LOGFILE are set", () => {
    process.env.PUPPETCHEF_INFO = "1";
    process.env.PUPPETCHEF_LOGFILE = "/tmp/puppetchef.log";
    const { logger } = require("../src/logger.js");

    expect(
      logger.transports.some(
        (t) =>
          t.filename === "puppetchef.log" &&
          t.dirname === "/tmp" &&
          t.level === "info",
      ),
    ).toBe(true);
  });

  it("should log to a file when both PUPPETCHEF_LOGLEVEL and PUPPETCHEF_LOGFILE are set", () => {
    process.env.PUPPETCHEF_LOGLEVEL = "debug";
    process.env.PUPPETCHEF_LOGFILE = "/tmp/puppetchef.log";
    const { logger } = require("../src/logger.js");

    expect(
      logger.transports.some(
        (t) =>
          t.filename === "puppetchef.log" &&
          t.dirname === "/tmp" &&
          t.level === "debug",
      ),
    ).toBe(true);
  });

  it("should not add any additional transports if no environment variables are set", () => {
    const { logger } = require("../src/logger.js");
    expect(logger.transports.length).toBe(1); // Default transport to /dev/null
  });
});
