import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import TypedConfig from "react-native-typed-config";

export const App = () => {
  const all = TypedConfig.getAllValues();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {Object.entries(all).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.title}>{key}</Text>
              <Text>{`${value}`}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontWeight: "600",
  },
  row: {
    padding: 15,
    marginBottom: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
  },
});
