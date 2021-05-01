import React from "react";
import { StyleSheet, View } from "react-native";
import Floppy from "./Floppy";

export default function FloppyBg() {
  return (
    <View style={styles.container}>
      <Floppy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09071d",
    alignItems: "center",
    justifyContent: "center",
  },
});
