import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { RouteProp, useFocusEffect } from "@react-navigation/core";
// import { ReText } from "react-native-redash";

import Spacer from "./components/Spacer";
import { SCREEN_PADDING_HORIZONTAL } from "./constants";
import { Fonts } from "./data";
import Icon from "./components/Icon";

const { width } = Dimensions.get("window");

interface DetailProps {
  route: RouteProp<Record<string, object | undefined>, string>;
  navigation: any;
}

const BUTTON_WIDTH = width - SCREEN_PADDING_HORIZONTAL * 2;

export default function Detail({ route, navigation }: DetailProps) {
  const isPageFocused = useSharedValue(false);

  const { id } = route.params;

  const updateIsPageFocused = (value: boolean) => {
    runOnUI((value) => {
      "worklet";
      isPageFocused.value = value;
    })(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        updateIsPageFocused(true);
      });
      return () => {
        task.cancel();
        updateIsPageFocused(false);
      };
    }, [])
  );

  const contentStyle = useAnimatedStyle(() => {
    const opacity = isPageFocused.value ? withTiming(1, { duration: 200 }) : 0;
    const translateY = isPageFocused.value
      ? withTiming(0, { duration: 200 })
      : -20;
    return {
      alignItems: "center",
      opacity,
      transform: [{ translateY }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    const opacity = isPageFocused.value
      ? withDelay(210, withTiming(1, { duration: 80 }))
      : 0;
    const translateY = isPageFocused.value
      ? withDelay(210, withTiming(0, { duration: 240 }))
      : -100;
    const width = isPageFocused.value
      ? withDelay(540, withTiming(BUTTON_WIDTH, { duration: 450 }))
      : 66;
    // console.log(width);
    return {
      width,
      opacity,
      transform: [{ translateY }],
    };
  });

  const buttonTextStyle = useAnimatedStyle(() => {
    const translateY = isPageFocused.value
      ? withDelay(870, withTiming(0, { duration: 180 }))
      : 18;
    return {
      transform: [{ translateY }],
    };
  });

  console.log("inte", id);

  const AnimatedText = Animated.createAnimatedComponent(Text);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SharedElement id={`item.backButton`}>
            <View style={styles.backButton}>
              <SimpleLineIcons name="arrow-left" size={20} color="#5a40b4" />
            </View>
          </SharedElement>
        </TouchableOpacity>
      </View>
      <Spacer ySpace={100} />
      <View style={styles.page}>
        <Animated.View style={contentStyle}>
          <Icon name="margarita" />
          <Spacer ySpace={40} />
          <Text style={styles.text}>Congratulations!</Text>
          <Spacer ySpace={10} />
          <Text style={styles.text}>Your order is accepted</Text>
        </Animated.View>
        <Spacer ySpace={200} />

        <Animated.View style={[styles.button, buttonStyle]}>
          <View style={styles.buttonTextContainer}>
            <AnimatedText style={[styles.buttonText, buttonTextStyle]}>
              Track your order
            </AnimatedText>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
  headerRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    fontFamily: Fonts.gilroySemibold,
    height: 56,
    width: 56,
    borderRadius: 10,
    backgroundColor: "#f6f5ff",
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    // flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: Fonts.gilroyMedium,
    fontSize: 16,
  },
  // buttonRow: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
  button: {
    width: "100%",
    height: 66,
    borderRadius: 33,
    backgroundColor: "#5d3cc5",
    overflow: "hidden",
    opacity: 1,
  },
  buttonTextContainer: {
    width: 140,
    height: 20,
    // backgroundColor: "pink",
    overflow: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -10,
    marginLeft: -70,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Fonts.gilroyMedium,
    fontSize: 16,
    color: "#fff",
  },
});
