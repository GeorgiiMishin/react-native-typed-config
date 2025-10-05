import { TurboModuleRegistry, type TurboModule } from "react-native";
import { type UnsafeObject } from "react-native/Libraries/Types/CodegenTypes";

export interface Spec extends TurboModule {
  getAllValues(): UnsafeObject;
}

export default TurboModuleRegistry.getEnforcing<Spec>("TypedConfig");
