const fs = require("fs");
const path = require("path");

const DEFAULT_ENV_FILE = ".env.json";

function readSettings(platform, content) {
  if (typeof content[platform] === "object") {
    return content[platform];
  }

  return content;
}

function getEnvFilePath(flavor, projectDir, settings) {
  let currentEnvName = settings.defaultEnvFile ?? DEFAULT_ENV_FILE;
  const entries = Object.entries(settings.envFiles ?? {});

  for (const [_flavor, name] of entries) {
    if (`${flavor}`.toLowerCase().endsWith(_flavor.toLowerCase())) {
      currentEnvName = name;
      break;
    }
  }

  return path.resolve(projectDir, "..", "env", currentEnvName);
}

async function readFromEntryPoint(platform, flavor, projectDir, entryPoint) {
  const pathToEntryPoint = path.resolve(projectDir, "..", "env", entryPoint);

  const fn = require(pathToEntryPoint);
  return await fn(platform, flavor);
}

async function extractConfig(platform, flavor, projectDir) {
  if (!platform || !flavor || !projectDir) {
    throw new Error(
      "Invalid arguments. Usage: node extractConfig.js <platform> <flavor> <projectDir>"
    );
  }

  const pathToSettingsFile = path.resolve(
    projectDir,
    "..",
    "env",
    "config.json"
  );

  if (!fs.existsSync(pathToSettingsFile)) {
    throw new Error(`Config file not found at path: ${pathToSettingsFile}`);
  }

  const content = fs.readFileSync(pathToSettingsFile, "utf-8");
  const parsedContent = JSON.parse(content);
  const settings = readSettings(platform, parsedContent);

  if (settings.entryPoint) {
    return await readFromEntryPoint(
      platform,
      flavor,
      projectDir,
      settings.entryPoint
    );
  }

  const filePath = getEnvFilePath(flavor, projectDir, settings);

  const envContent = fs.readFileSync(filePath, "utf-8");
  const parsedEnvContent = JSON.parse(envContent);

  return parsedEnvContent;
}

module.exports = extractConfig;
