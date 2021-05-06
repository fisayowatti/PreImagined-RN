import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import Menu from "./Menu";
import Category from "./Category";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { useSharedValue } from "react-native-reanimated";

export default function Dendy() {
  let [fontsLoaded] = useFonts({
    "Gilroy-Regular": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-SemiBold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
  });

  const menuActive = useSharedValue(false);

  const isOptionSelected = useSharedValue(false);

  const selectedOption = useSharedValue("home");

  console.log("stuff", selectedOption.value, menuActive.value);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Fragment>
        <View style={styles.container}>
          <Category selectedOption={selectedOption} />
          <Menu {...{ menuActive, selectedOption }} />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09071d",
  },
});
