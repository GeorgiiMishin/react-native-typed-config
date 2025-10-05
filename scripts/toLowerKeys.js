function toLowerKeys(obj) {
  let res = {};

  const entries = Object.entries(obj);

  for (const [key, value] of entries) {
    res[key.toLowerCase()] = value;
  }

  return res;
}

module.exports = toLowerKeys;
