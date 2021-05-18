import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Dropdown from "./Dropdown";

export default function Filter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top</Text>
      <Dropdown
        options={[
          { label: "popular", value: "popular" },
          { label: "expensive", value: "expensive" },
        ]}
        selected="popular"
        containerStyle={{ width: 220, marginRight: 20 }}
      />
      <Text style={styles.text}>in</Text>
      <Dropdown
        options={[
          { label: "1 day", value: "one-day" },
          { label: "1 week", value: "one-week" },
        ]}
        selected="one-day"
        containerStyle={{ width: 170, marginRight: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 48,
    marginRight: 20,
    marginTop: 10,
  },
});
