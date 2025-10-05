import TypedConfig from "./NativeTypedConfig";

export interface Config {
  [key: string]: string | number | boolean;
}

const TypedConfigModule = {
  getAllValues: () => TypedConfig.getAllValues() as Config,
};

export default TypedConfigModule;
