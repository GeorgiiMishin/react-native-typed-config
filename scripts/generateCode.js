const toPlatformValue = require("./toPlatformValue");

const SUPPORT_TYPES = {
  NUMBER: "number",
  BOOLEAN: "boolean",
  STRING: "string",
};

const SUPPORT_TYPES_SET = new Set([
  SUPPORT_TYPES.NUMBER,
  SUPPORT_TYPES.BOOLEAN,
  SUPPORT_TYPES.STRING,
]);

function generateCode(content, platform, mapper, separator = "\n") {
  const entries = Object.entries(content);

  let str = "";
  for (const [key, baseVal] of entries) {
    const value = toPlatformValue(baseVal, platform);
    const type = typeof value;

    if (!SUPPORT_TYPES_SET.has(type)) {
      continue;
    }

    const row =
      typeof mapper === "function"
        ? mapper(key, value)
        : mapper[type](key, value);

    str += row;
    str += separator;
  }

  return str;
}

module.exports.generateCode = generateCode;
module.exports.SUPPORT_TYPES = SUPPORT_TYPES;
module.exports.SUPPORT_TYPES_SET = SUPPORT_TYPES_SET;
