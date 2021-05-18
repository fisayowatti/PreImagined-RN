import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";

import { SCREEN_PADDING_HORIZONTAL } from "../constants";

const { width } = Dimensions.get("screen");

export default function Search() {
  return (
    <View style={styles.container}>
      <Octicons name="search" size={24} color="black" />
      <TextInput style={styles.input} placeholder="Search artworks" />
      <Octicons name="settings" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f9fb",
    borderRadius: 16,
    paddingHorizontal: 18,
  },
  input: {
    width: width - SCREEN_PADDING_HORIZONTAL * 2 - (24 + 18 + 18) * 2,
    // width: "50%",
    height: "100%",
    marginHorizontal: 18,
    fontSize: 16,
    fontFamily: "Gilroy-Regular",
    // backgroundColor: "red",
    // paddingTop: 20,
    // paddingBottom: 20,
  },
});
