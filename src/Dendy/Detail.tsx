import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spacer from "./components/Spacer";
import { Fonts } from "./data";

export default function Detail() {
  return (
    <View>
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <View style={styles.button}>
            <SimpleLineIcons name="arrow-left" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{ uri: "https://source.unsplash.com/random/600x600" }}
          height={56}
          width={56}
        />
      </View>
      <Spacer ySpace={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
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
