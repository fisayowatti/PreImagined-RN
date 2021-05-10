import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/core";

const { height, width } = Dimensions.get("window");

const SCALE_DURATION = 300;
const IMAGE_CONTAINER_HEIGHT = 324;

interface DetailProps {
  route: any;
  navigation: any;
}

export default function Detail({ route, navigation }: DetailProps) {
  const isPageFocused = useSharedValue(false);

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

  const restOfPageStyle = useAnimatedStyle(() => {
    const scale = isPageFocused.value
      ? withTiming(1, { duration: SCALE_DURATION })
      : withTiming(0.9);

    const opacity = isPageFocused.value
      ? withTiming(1, { duration: SCALE_DURATION })
      : withTiming(0);
    return {
      opacity,
      transform: [
        { translateY: height / 2 },
        { scale },
        { translateY: -height / 2 },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const scale = isPageFocused.value
      ? withTiming(1, { duration: SCALE_DURATION })
      : withTiming(1.5);

    return {
      height: IMAGE_CONTAINER_HEIGHT,
      width: `100%`,
      borderRadius: 10,
      backgroundColor: "#ddd",
      // marginLeft,
      transform: [{ scale }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <SharedElement id={`item.profileImage`}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://source.unsplash.com/random/600x600" }}
            height={56}
            width={56}
          />
        </SharedElement>
      </View>
      <Animated.View style={[restOfPageStyle]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <SimpleLineIcons name="arrow-left" size={20} color="#5a40b4" />
            </View>
          </TouchableOpacity>
        </View>
        <Spacer ySpace={32} />
        <Animated.View style={styles.imageContainer}>
          <Animated.Image
            style={[imageStyle]}
            source={{ uri: "https://source.unsplash.com/random/600x600" }}
            // height={400}
            // resizeMode="center"
          />
        </Animated.View>
        <Spacer ySpace={30} />
        <View style={styles.metaRow}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Art</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{18}</Text>
            <Text style={styles.priceUnit}>{"ETH"}</Text>
          </View>
        </View>
        <Spacer ySpace={30} />
        <Text style={styles.title}>Nature</Text>
        <Spacer ySpace={12} />
        <Text style={styles.body}>
          Nature has many aspects of it that are wondrous to behold. The sights,
          sounds and even smells that we've been blessed with...
        </Text>
        <Spacer ySpace={40} />
        <View style={styles.buttonRow}>
          <View style={[styles.buyButton, styles.bottomButton]}>
            <Text style={[styles.bottomButtonText, styles.buyButtonText]}>
              Buy now
            </Text>
          </View>
          <Spacer xSpace={18} />
          <View style={[styles.bidButton, styles.bottomButton]}>
            <Text style={[styles.bottomButtonText, styles.bidButtonText]}>
              Bid
            </Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    position: "absolute",
    right: SCREEN_PADDING_HORIZONTAL,
    top: 20 + 43,
  },
  // restOfPage: {},
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
  profileImage: {
    height: 56,
    width: 56,
    borderRadius: 10,
  },
  imageContainer: {
    height: IMAGE_CONTAINER_HEIGHT,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 26,
    color: "#3a9973",
    marginRight: 6,
  },
  priceUnit: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 16,
    color: "#3a9973",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pill: {
    height: 30,
    width: 70,
    borderRadius: 15,
    backgroundColor: "#fce7e8",
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 16,
    color: "#e47e58",
  },
  title: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 48,
  },
  body: {
    fontFamily: Fonts.gilroyRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: "row",
    height: 66,
  },
  bottomButton: {
    flex: 1,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonText: {
    fontFamily: Fonts.gilroyMedium,
    fontSize: 18,
  },
  buyButton: {
    backgroundColor: "#5d3cc5",
  },
  buyButtonText: {
    color: "#fff",
  },
  bidButton: {
    backgroundColor: "#f6f5ff",
  },
  bidButtonText: {
    color: "#5a40b4",
  },
});
