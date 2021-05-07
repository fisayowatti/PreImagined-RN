import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fonts } from "../data";
import { SharedElement } from "react-navigation-shared-element";

interface HeaderRowProps {
  onMenuClick: () => void;
}

export default function HeaderRow({ onMenuClick }: HeaderRowProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuClick}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Menu</Text>
        </View>
      </TouchableOpacity>
      <SharedElement id={`item.profileImage`}>
        <Image
          style={styles.image}
          source={{ uri: "https://source.unsplash.com/random/600x600" }}
          height={56}
          width={56}
        />
      </SharedElement>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    fontFamily: Fonts.gilroySemibold,
    height: 56,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#f6f5ff",
    justifyContent: "center",
    alignItems: "center",
    color: "#f6f5ff",
  },
  buttonText: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 16,
    color: "#5a40b4",
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 10,
  },
});
