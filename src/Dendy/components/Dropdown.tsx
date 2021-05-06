import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface DropdownProps {
  options: {
    label: string;
    value: string | number;
  }[];
  selected: string | number;
  containerStyle?: any;
  fontStyle?: any;
  iconSize?: number;
}

export default function Dropdown({
  options,
  selected,
  containerStyle,
  fontStyle,
  iconSize,
}: DropdownProps) {
  const displayText = options.find((item) => item.value === selected)?.label;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[fontStyle, styles.text]}>{displayText}</Text>
      <AntDesign
        name="down"
        size={iconSize ?? 24}
        color="black"
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#5a40b4",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 48,
    color: "#5a40b4",
    marginTop: 10,
  },
});
