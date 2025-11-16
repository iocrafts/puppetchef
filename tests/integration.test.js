const { main } = require("../src/index.js");

jest.setTimeout(10000);

describe("Integration Test", () => {
  it("should execute the program with a real recipe", async () => {
    const conf = {
      headless: true,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: [
        "--no-sandbox",
        "--in-process-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
      ],
    };

    const recipe = {
      name: "Example",
      url: "https://www.iocrafts.com/projects/puppetchef",
      tasks: [
        {
          name: "Go To Examples",
          steps: [
            {
              "puppetchef.builtin.common": {
                command: "select",
                timeout: 3000,
                selector:
                  'xpath///*[@id="main-content"]/article/section/div[2]/div/div[7]',
              },
              register: "recipe",
              ignore_errors: false,
            },
            {
              "puppetchef.builtin.common": {
                command: "debug",
                format:
                  "Here is an exmaple recipe\n-----\n{{{ recipe }}}\n-----",
              },
              ignore_errors: false,
            },
          ],
        },
      ],
    };

    const plugins = {
      "puppetchef.builtin.common": require("../builtin/common.js"),
    };

    const result = await main(conf, recipe, plugins);

    // Verify the program exits with a success code
    expect(result).toBe(0);
  });
});
