import React from "react";
import { StyleSheet, View } from "react-native";

export default function Menu() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#000000",
  },
});
