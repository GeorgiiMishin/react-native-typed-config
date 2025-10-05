function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = async function (platform, flavor) {
  await delay(5000);
  const result = await Promise.resolve({ platform, flavor, pidor: true });

  return result;
};
