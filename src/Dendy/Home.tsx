import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { Button } from "../components";

const { width, height } = Dimensions.get("window");

const SIZE = 400;
// const SIZE = height * 2;

export default function Home() {
  const goToMenu = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={{ marginTop: 300 }}>
          <Button onPress={goToMenu} label="Menu" />
        </View>
        <Text>Suojhghjbhjbj</Text>
        <Text>Suojhghjbhjbj</Text>
        <Text>Suojhghjbhjbj</Text>
        <Text>Suojhghjbhjbj</Text>
        <Text>Suojhghjbhjbj</Text>
      </View>
    </View>
  );
}

// console.log(SIZE);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -(SIZE / 2),
    marginLeft: -(SIZE / 2),
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  frame: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // marginTop: -(height / 2),
    // marginLeft: -(width / 2),

    height,
    width,
    backgroundColor: "green",
  },
});
