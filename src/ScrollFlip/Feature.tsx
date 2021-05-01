import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface FeatureProps {
  subtext: string;
  name: string;
}

export default function Feature({ name, subtext }: FeatureProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        height={60}
        width={60}
        source={require("../../assets/plane.png")}
      />
      <View style={styles.text}>
        <Text style={styles.textMajor}>{name}</Text>
        <Text style={styles.textMinor}>{subtext}</Text>
      </View>
      {/* <Text
        style={[{ color: type == "credit" ? "green" : "white" }, styles.amount]}
      >
        {amount}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginRight: 20,
  },
  text: {
    flexDirection: "column",
  },
  textMajor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  textMinor: {
    fontSize: 14,
    opacity: 0.5,
    color: "#fff",
  },
  //   amount: {
  //     fontWeight: "bold",
  //     fontSize: 24,
  //     marginLeft: "auto",
  //   },
});
