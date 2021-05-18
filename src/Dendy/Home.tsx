import React, { Fragment } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { runOnUI } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Filter from "./components/Filter";
import HeaderRow from "./components/HeaderRow";
import Item from "./components/Item";
import Search from "./components/Search";
import Spacer from "./components/Spacer";
import { SCREEN_PADDING_HORIZONTAL } from "./constants";
import { data } from "./data";

interface HomeProps {
  menuActive: Animated.SharedValue<boolean>;
}

export default function Home({ menuActive }: HomeProps) {
  const onMenuClick = () => {
    runOnUI(() => {
      "worklet";
      menuActive.value = true;
    })();
  };
  return (
    <Fragment>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <HeaderRow {...{ onMenuClick }} />
          <Spacer ySpace={16} />
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            snapToOffsets={[16 + 64 + 32 + 140]} //spacer + search height + spacer + filter height
            decelerationRate="fast"
            snapToEnd={false}
            snapToStart={false}
          >
            <Spacer ySpace={16} />
            <Search />
            <Spacer ySpace={32} />
            <Filter />
            <Spacer ySpace={20} />
            <View>
              {data.home.map(({ id, name, price, priceUnit, image }) => (
                <Item key={id} {...{ name, price, priceUnit, image }} />
              ))}
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
    // top: "50%",
    // left: "50%",
    // marginTop: -(height / 2),
    // marginLeft: -(width / 2),
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
});
