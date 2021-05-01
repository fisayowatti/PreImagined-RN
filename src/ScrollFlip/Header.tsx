import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import {
  TextInput,
  //   TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const SEARCH_ICON_APPEAR_THRESHOLD = -50;
const SEARCH_BAR_WIDTH = width - 32; //32 represents the horizontal margin;
const SEARCH_BAR_ANIM_DURATION = 200;

const ICON_CONTAINER_SIZE = 48;
const ICON_SIZE = 18;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableWithoutFeedback
);

interface HeaderProps {
  firstSectionY: Animated.SharedValue<number>;
  secondSectionY: Animated.SharedValue<number>;
  sectionTitles: string[];
  hasScrollStarted: Animated.SharedValue<boolean>;
  searchButtonClicked: Animated.SharedValue<boolean>;
  onSearch: (text: string) => void;
}

export default function Header({
  firstSectionY,
  secondSectionY,
  sectionTitles,
  hasScrollStarted,
  searchButtonClicked,
  onSearch,
}: HeaderProps) {
  const [layoutWidths, setLayoutWidths] = useState({
    searchIcon: 0,
    closeIcon: 0,
  });
  //   const searchButtonClicked = useSharedValue(false);

  const marginTop = useDerivedValue(() => {
    return firstSectionY.value > 122 && hasScrollStarted.value //the if else conditioning here needs work
      ? 55 //show nothing
      : firstSectionY.value <= 122 &&
        !(secondSectionY.value <= 122) &&
        hasScrollStarted.value
      ? 6 // show first value
      : secondSectionY.value <= 122 && hasScrollStarted.value
      ? -38 // show second value
      : 55; //show nothing
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(marginTop.value, { duration: 700 }),
      //   marginTop: 55,
    };
  });

  //if you are at the left side of : then scroll direction is up else scroll direction is down

  const iconOpacity = useDerivedValue(() => {
    return firstSectionY.value <= -50 && hasScrollStarted.value ? 0 : 1;
  });

  const iconScale = useDerivedValue(() => {
    return firstSectionY.value <= -50 && hasScrollStarted.value ? 1 : 0;
  });

  const exchangeIconStyle = useAnimatedStyle(() => {
    return {
      opacity:
        iconOpacity.value === 0
          ? withTiming(iconOpacity.value, { duration: 0 }) //scrolling up
          : withDelay(500, withTiming(iconOpacity.value, { duration: 0 })), //scrolling down
    };
  });
  const searchIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(iconScale.value, { duration: 500 }),
          // iconScale.value === 1
          //   ? withTiming(iconScale.value, { duration: 500 }) //scrolling up
          //   : withTiming(iconScale.value, { duration: 500 }), //scrolling down
        },
      ],
    };
  });

  const titleContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: searchButtonClicked.value ? 0 : 1,
      width: searchButtonClicked.value
        ? 0
        : withDelay(
            SEARCH_BAR_ANIM_DURATION,
            withTiming(SEARCH_BAR_WIDTH / 2, { duration: 50 })
          ),
    };
  });

  const searchContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchButtonClicked.value ? "transparent" : "#17161D", //see
      borderColor: "#ccc",
      borderWidth: searchButtonClicked.value ? 1 : 0,
      width: searchButtonClicked.value
        ? withTiming(SEARCH_BAR_WIDTH, { duration: SEARCH_BAR_ANIM_DURATION })
        : withTiming(ICON_CONTAINER_SIZE, {
            duration: SEARCH_BAR_ANIM_DURATION,
          }), //see
    };
  });

  const iconContainerStyle = useAnimatedStyle(() => {
    return {
      marginLeft: searchButtonClicked.value ? 4 : 0,
    };
  });

  const textInputStyle = useAnimatedStyle(() => {
    const fullWidth =
      SEARCH_BAR_WIDTH - (layoutWidths.searchIcon + 4) - layoutWidths.closeIcon;
    return {
      width: searchButtonClicked.value
        ? withTiming(fullWidth, { duration: SEARCH_BAR_ANIM_DURATION + 200 })
        : withTiming(0, { duration: SEARCH_BAR_ANIM_DURATION }),
      opacity: searchButtonClicked.value ? 1 : 0,
    };
  });

  const closeContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: searchButtonClicked.value
        ? withDelay(SEARCH_BAR_ANIM_DURATION, withTiming(1))
        : 0,
    };
  });

  const onSearchButtonClick = () => {
    if (firstSectionY.value <= SEARCH_ICON_APPEAR_THRESHOLD) {
      runOnUI(() => {
        "worklet";
        searchButtonClicked.value = true;
      })();
    } else return;
  };
  const onCloseButtonClick = () => {
    onSearch("");
    runOnUI(() => {
      "worklet";
      searchButtonClicked.value = false;
    })();
  };

  console.log("wiz", width, height);

  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.8)", "transparent"]}
      style={[styles.container]}
    >
      <Animated.View style={[styles.titleContainer, titleContainerStyle]}>
        <Animated.View style={[textStyle]}>
          <Text style={[styles.title]}>{sectionTitles[0]}</Text>
          <Text style={styles.title}>{sectionTitles[1]}</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.searchContainer, searchContainerStyle]}>
        <Animated.View
          style={[styles.iconContainer, iconContainerStyle]}
          onLayout={({ nativeEvent }) =>
            setLayoutWidths({
              ...layoutWidths,
              searchIcon: nativeEvent.layout.width,
            })
          }
        >
          <Animated.View style={[exchangeIconStyle, styles.iconStyle]}>
            <FontAwesome name="exchange" size={ICON_SIZE} color="white" />
          </Animated.View>
          <Animated.View style={[searchIconStyle, styles.iconStyle]}>
            <FontAwesome
              name="search"
              size={ICON_SIZE}
              color="white"
              onPress={onSearchButtonClick}
            />
          </Animated.View>
          <TouchableOpacity
            onPress={onSearchButtonClick}
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              height: ICON_CONTAINER_SIZE,
              width: ICON_CONTAINER_SIZE,
            }}
          ></TouchableOpacity>
        </Animated.View>
        <View style={[styles.textInputContainer]}>
          <AnimatedTextInput
            onChangeText={onSearch}
            selectionColor="red"
            placeholder="Search..."
            placeholderTextColor="#fff"
            style={[styles.textInput, textInputStyle]}
          />
        </View>
        <Animated.View
          style={[styles.closeContainer, closeContainerStyle]}
          onLayout={({ nativeEvent }) =>
            setLayoutWidths({
              ...layoutWidths,
              closeIcon: nativeEvent.layout.width,
            })
          }
        >
          <FontAwesome
            name="close"
            size={24}
            color="white"
            onPress={onCloseButtonClick}
          />
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchContainer: {
    // marginLeft: "auto",

    height: ICON_CONTAINER_SIZE,
    borderRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 10 },

    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    // backgroundColor: "pink",
    height: "100%",
    width: ICON_CONTAINER_SIZE,
    alignSelf: "flex-start",
    marginLeft: 4, //see
    zIndex: 1,
  },
  iconStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -(ICON_SIZE / 2),
    marginTop: -(ICON_SIZE / 2),
    // backgroundColor: "pink",
  },
  textInputContainer: {
    // height: "100%",
  },
  textInput: {
    // backgroundColor: "powderblue",
    color: "#fff",
    fontSize: 20,
    marginRight: 5,
    paddingVertical: 10,
  },
  closeContainer: {
    marginLeft: "auto",
    paddingHorizontal: 20,
    // backgroundColor: "pink",
  },
  titleContainer: {
    height: 50,
    // backgroundColor: "pink",
    overflow: "hidden",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
});
