import React from "react";
import MaskedView from "@react-native-community/masked-view";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import Home from "./Home";
import MenuContent from "./MenuContent";

const { width, height } = Dimensions.get("window");

const MASK_SIZE = 200;
// const MASK_SIZE = height * 2;
// const SIZE = height * 2;

interface MenuProps {
  menuActive: Animated.SharedValue<boolean>;
  selectedOption: Animated.SharedValue<string>;
}

export default function Menu({ menuActive, selectedOption }: MenuProps) {
  //700ms

  const circleStyle = useAnimatedStyle(() => {
    const height = menuActive.value
      ? withDelay(300, withTiming(58, { duration: 200 }))
      : withTiming(MASK_SIZE, { duration: 200 });

    const width = menuActive.value
      ? withDelay(300, withTiming(58, { duration: 200 }))
      : withTiming(MASK_SIZE, { duration: 200 });

    const scale = menuActive.value
      ? withTiming(1, { duration: 400 })
      : withDelay(200, withTiming(10, { duration: 400 }));

    const translateX = menuActive.value
      ? withDelay(300, withTiming(150, { duration: 200 }))
      : withTiming(240, { duration: 200 });

    return {
      height,
      width,
      transform: [{ translateX }, { translateY: 59 }, { scale }],
    };
  });

  const maskedViewStyle = useAnimatedStyle(() => {
    const newHeight = menuActive.value
      ? withDelay(450, withTiming(0, { duration: 1 }))
      : withTiming(height, { duration: 1 });

    return {
      flex: 1,
      height: newHeight,
      // height,
      overflow: "hidden",
      width: "100%",
      position: "absolute",
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    const newHeight =
      selectedOption.value !== "home"
        ? withTiming(96, { duration: 600 })
        : withDelay(250, withTiming(height, { duration: 600 }));

    const borderRadiusTop =
      selectedOption.value !== "home"
        ? withDelay(210, withTiming(60, { duration: 1 }))
        : withDelay(570, withTiming(0, { duration: 1 }));
    const borderRadiusBottom =
      selectedOption.value !== "home"
        ? withTiming(60, { duration: 1 })
        : withDelay(850, withTiming(0, { duration: 1 }));

    const translateY =
      selectedOption.value !== "home"
        ? withDelay(210, withTiming(40, { duration: 220 }))
        : withDelay(350, withTiming(0, { duration: 220 }));

    const translateX =
      selectedOption.value !== "home"
        ? withDelay(530, withTiming(-width, { duration: 400 }))
        : withTiming(0, { duration: 400 });

    return {
      height: newHeight,
      borderTopLeftRadius: borderRadiusTop,
      borderTopRightRadius: borderRadiusTop,
      borderBottomLeftRadius: borderRadiusBottom,
      borderBottomRightRadius: borderRadiusBottom,
      transform: [{ translateY }, { translateX }],
    };
  });

  const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <MenuContent {...{ menuActive, selectedOption }} />
      <AnimatedMaskedView
        style={maskedViewStyle}
        maskElement={<Animated.View style={[styles.circle, circleStyle]} />}
      >
        <Home {...{ menuActive }} />
      </AnimatedMaskedView>
    </Animated.View>
  );
}
//remove all height from MaskedView to give focus to the menu screen
// console.log(SIZE);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#5d3cc5",
    overflow: "hidden",
  },
  circle: {
    // flex: 1,
    // height: MASK_SIZE,
    // width: MASK_SIZE,
    backgroundColor: "#000",
    borderRadius: MASK_SIZE,
  },
});
