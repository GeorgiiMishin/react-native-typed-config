const fs = require("fs");
const path = require("path");
const { SUPPORT_TYPES, generateCode } = require("./generateCode");
const extractConfig = require("./extractConfig");

const configName = (process.argv[2] ?? "").toLowerCase();

const generatedFilePath_M = path.resolve(
  process.env.PODS_TARGET_SRCROOT,
  "ios",
  "GeneratedConfig.m"
);

async function main() {
  const parsedContent = await extractConfig(
    "ios",
    configName,
    path.resolve(process.env.PROJECT_DIR, "..")
  );

  const objcCode = generateCode(
    parsedContent,
    "ios",
    {
      [SUPPORT_TYPES.NUMBER]: (key, value) => `@"${key}": @"${value}"`,
      [SUPPORT_TYPES.STRING]: (key, value) => `@"${key}": @"${value}"`,
      [SUPPORT_TYPES.BOOLEAN]: (key, value) =>
        `@"${key}": @${value ? "YES" : "NO"}`,
    },
    ","
  );

  fs.writeFileSync(generatedFilePath_M, `#define DOT_ENV @{ ${objcCode} };`);
}

main();
