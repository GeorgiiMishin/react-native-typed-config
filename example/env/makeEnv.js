/**
 *
 * @param {string} platform текущая платформа (android, ios)
 * @param {string} buildTypeInfo тип сборки (для андроид - flavor + type, для ios - type)
 */
module.exports = async function (platform, buildTypeInfo) {
  const result = await Promise.resolve({ platform, buildTypeInfo });

  return result;
};
