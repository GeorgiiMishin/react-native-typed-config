function toPlatformValue(value, platform) {
  const type = typeof value;

  if (type === "object") {
    return value[platform];
  } else {
    return value;
  }
}

module.exports = toPlatformValue;
