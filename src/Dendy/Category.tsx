import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderRow from "./components/HeaderRow";
import Search from "./components/Search";
import Spacer from "./components/Spacer";
import { validNames } from "./components/Icon";
import { data, Fonts } from "./data";
import Item from "./components/Item";
import { SCREEN_PADDING_HORIZONTAL } from "./constants";
import Animated, {
  runOnJS,
  runOnUI,
  useDerivedValue,
} from "react-native-reanimated";

const renderTitle = (selectedOption: Animated.SharedValue<string>) => {
  "worklet";
  switch (selectedOption.value) {
    case validNames.art:
      return "Art Collection";
    case validNames.photography:
      return "Photo Gallery";
    case validNames.games:
      return "Arcade";
    case validNames.music:
      return "Sound Bytes";
    case validNames.memes:
      return "Funny Hall";
    default:
      return "Random Title";
  }
};

interface CategoryProps {
  selectedOption: Animated.SharedValue<string>;
  route: any;
  navigation: any;
}

export default function Category({
  selectedOption,
  route,
  navigation,
}: CategoryProps) {
  //updating state renders the correct selectedOption value
  const [x, setX] = useState("");
  useDerivedValue(() => {
    //conditional update here stops page values from changing when the menu button is clicked
    if (selectedOption.value !== "home") {
      runOnJS(setX)(selectedOption.value);
    }
    return selectedOption.value;
  });

  const onMenuClick = () => {
    runOnUI(() => {
      "worklet";
      selectedOption.value = "home";
    })();
  };

  // const displayText = useDerivedValue(() => renderTitle(selectedOption));
  return (
    <Fragment>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <HeaderRow {...{ onMenuClick }} />
          <Spacer ySpace={16} />
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            snapToOffsets={[16 + 64 + 32 + 48]} //spacer + search height + spacer + title height
            decelerationRate="fast"
            snapToEnd={false}
            snapToStart={false}
          >
            <Spacer ySpace={16} />
            <Search />
            <Spacer ySpace={32} />
            <Text style={styles.title}>{renderTitle(selectedOption)}</Text>
            {/* <ReText text={displayText} style={styles.title} /> */}
            <Spacer ySpace={20} />
            <View>
              {data[selectedOption.value].map(
                ({ id, name, price, priceUnit, image }) => (
                  <TouchableWithoutFeedback
                    key={id}
                    onPress={() => navigation.navigate("Detail")}
                  >
                    <Item {...{ name, price, priceUnit, image }} />
                  </TouchableWithoutFeedback>
                )
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",

    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
  title: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 48,
  },
});
