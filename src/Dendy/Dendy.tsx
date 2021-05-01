import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "./Home";
import Menu from "./Menu";

export default function Dendy() {
  return (
    <View style={styles.container}>
      <Menu />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09071d",
  },
});
