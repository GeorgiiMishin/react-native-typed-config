/**
 *
 * @param {string} platform текущая платформа (android, ios)
 * @param {string} buildTypeInfo тип сборки (для андроид - flavor + type, для ios - type)
 */
module.exports = async function (platform, buildTypeInfo) {
  await delay(5000);
  const result = await Promise.resolve({ platform, flavor, pidor: true });

  return result;
};
