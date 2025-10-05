package com.typedconfig

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = TypedConfigModule.NAME)
class TypedConfigModule(reactContext: ReactApplicationContext) :
  NativeTypedConfigSpec(reactContext) {

  override fun getAllValues(): WritableMap? {
    val map = Arguments.createMap()

    val clazz = Class.forName("com.typedconfig.BuildConfig")

    clazz.fields.forEach { field ->
      val name = field.name
      val value = field.get(null)

      when (value) {
        is Boolean -> map.putBoolean(name, value)
        is Int -> map.putInt(name, value)
        is Double -> map.putDouble(name, value)
        is Float -> map.putDouble(name, value.toDouble())
        is String -> map.putString(name, value)
        else -> map.putString(name, value?.toString())
      }
    }

    return map
  }

  companion object {
    const val NAME = "TypedConfig"
  }
}
