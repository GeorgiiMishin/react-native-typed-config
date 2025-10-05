const toPlatformValue = require("./toPlatformValue");
const extractConfig = require("./extractConfig");

const { SUPPORT_TYPES_SET, SUPPORT_TYPES } = require("./generateCode");

const [currentFlavor, projectDir] = process.argv.slice(2);

function makeStringIfNeeded(value) {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  return value;
}

const TYPE_MAPPER = {
  [SUPPORT_TYPES.STRING]: "String",
  [SUPPORT_TYPES.NUMBER]: "double",
  [SUPPORT_TYPES.BOOLEAN]: "boolean",
};

async function main() {
  const parsedContent = await extractConfig(
    "android",
    currentFlavor,
    projectDir
  );
  const entries = Object.entries(parsedContent);

  const result = [];

  for (const [key, value] of entries) {
    const preparedValue = toPlatformValue(value, "android");
    const type = typeof preparedValue;

    if (!SUPPORT_TYPES_SET.has(type)) {
      continue;
    }

    result.push({
      key: key,
      value: makeStringIfNeeded(preparedValue).toString(),
      type: TYPE_MAPPER[type],
    });
  }

  console.log(JSON.stringify(result));
}

main();
