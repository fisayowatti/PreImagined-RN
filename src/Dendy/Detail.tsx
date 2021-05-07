import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "./components/Spacer";
import { SCREEN_PADDING_HORIZONTAL } from "./constants";
import { Fonts } from "./data";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/core";

const { height, width } = Dimensions.get("window");

export default function Detail() {
  const isPageFocused = useSharedValue(false);

  const updateIsPageFocused = (value: boolean) => {
    runOnUI((value) => {
      "worklet";
      isPageFocused.value = value;
    })(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      updateIsPageFocused(true);

      return () => updateIsPageFocused(false);
    }, [])
  );

  const restOfPageStyle = useAnimatedStyle(() => {
    const scale = isPageFocused
      ? withTiming(1, { duration: 1000 })
      : withTiming(0.85);
    return {
      transform: [
        { translateY: height / 2 },
        { scale },
        { translateY: -height / 2 },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <SharedElement id={`item.profileImage`}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://source.unsplash.com/random/600x600" }}
            height={56}
            width={56}
          />
        </SharedElement>
      </View>
      <Animated.View style={[styles.restOfPage, restOfPageStyle]}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <View style={styles.button}>
              <SimpleLineIcons name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Spacer ySpace={20} />
        <Image
          style={styles.image}
          source={{ uri: "https://source.unsplash.com/random/600x600" }}
          height={400}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    right: SCREEN_PADDING_HORIZONTAL,
    top: 20 + 43,
  },
  restOfPage: {},
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
  profileImage: {
    height: 56,
    width: 56,
    borderRadius: 10,
  },
  image: {
    height: 400,
    width: "100%",
    borderRadius: 10,
  },
});
