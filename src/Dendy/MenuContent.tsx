import { Ionicons, Octicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Icon, { validNames } from "./components/Icon";
import Spacer from "./components/Spacer";
import { Fonts } from "./data";

const { width } = Dimensions.get("window");

interface MenuButtonProps {
  label: string;
  icon: string;
  onButtonClick?: () => void;
}

interface MenuContentProps {
  menuActive: Animated.SharedValue<boolean>;
  selectedOption: Animated.SharedValue<string>;
}

interface CloseProps {
  onCloseClick: () => void;
  menuActive: Animated.SharedValue<boolean>;
  selectedOption: Animated.SharedValue<string>;
}

const Block = () => (
  <View style={{ height: 20, width: 20, backgroundColor: "#ccc" }} />
);

const Close = ({ onCloseClick, menuActive, selectedOption }: CloseProps) => {
  const closeStyle = useAnimatedStyle(() => {
    const translateX = menuActive.value
      ? withDelay(500, withTiming(0, { duration: 200 }))
      : withTiming(115, { duration: 200 });
    const opacity = menuActive.value
      ? withDelay(500, withTiming(1, { duration: 1 }))
      : withDelay(0, withTiming(0, { duration: 1 }));
    const marginLeft =
      selectedOption.value !== "home"
        ? withDelay(530, withTiming(width - 80, { duration: 400 }))
        : withTiming(0, { duration: 400 });
    return {
      opacity,
      marginLeft,
      transform: [{ translateX }],
      // transform: [{ translateX: 115 }],
    };
  });
  return (
    <TouchableOpacity onPress={onCloseClick}>
      <Animated.View style={[styles.close, closeStyle]}>
        <Ionicons name="close" size={32} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const MenuButton = ({ label, icon, onButtonClick }: MenuButtonProps) => {
  return (
    <TouchableOpacity onPress={onButtonClick}>
      <View style={styles.menuButtonContainer}>
        <Icon name={icon} />
        <Text style={styles.menuButtonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SortButton = () => {
  return (
    <View style={styles.sortButtonContainer}>
      <Octicons name="settings" size={20} color="#fff" />
      <Text style={styles.sortButtonText}>Filter & Sort</Text>
    </View>
  );
};

export default function MenuContent({
  menuActive,
  selectedOption,
}: MenuContentProps) {
  const onCloseClick = () => {
    runOnUI(() => {
      "worklet";
      menuActive.value = false;
    })();
  };

  const onMenuButtonClick = (value: string) => {
    runOnUI((value) => {
      "worklet";
      selectedOption.value = value;
    })(value);
  };

  const containerStyle = useAnimatedStyle(() => {
    const translateY =
      selectedOption.value !== "home"
        ? withDelay(210, withTiming(-40, { duration: 220 }))
        : withDelay(350, withTiming(0, { duration: 220 }));
    return {
      transform: [{ translateY }],
    };
  });
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Spacer ySpace={60} />
      <Close {...{ onCloseClick, menuActive, selectedOption }} />
      <Spacer ySpace={36} />
      <Text style={styles.title}>Explore</Text>
      <Spacer ySpace={36} />
      <MenuButton
        label="Art"
        icon="art"
        onButtonClick={() => onMenuButtonClick(validNames.art)}
      />
      <Spacer ySpace={20} />
      <MenuButton
        label="Photography"
        icon="photography"
        onButtonClick={() => onMenuButtonClick(validNames.photography)}
      />
      <Spacer ySpace={20} />
      <MenuButton
        label="Games"
        icon="games"
        onButtonClick={() => onMenuButtonClick(validNames.games)}
      />
      <Spacer ySpace={20} />
      <MenuButton
        label="Music"
        icon="music"
        onButtonClick={() => onMenuButtonClick(validNames.music)}
      />
      <Spacer ySpace={20} />
      <MenuButton
        label="Memes"
        icon="memes"
        onButtonClick={() => onMenuButtonClick(validNames.memes)}
      />
      <Spacer ySpace={70} />
      <SortButton />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // position: "absolute",
    paddingHorizontal: 36,
  },
  close: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    backgroundColor: "#170030",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 48,
    color: "#fff",
  },
  menuButtonContainer: {
    height: 73,
    width: "100%",
    borderWidth: 2,
    borderColor: "#8567e4",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    // justifyContent: "center",
  },
  menuButtonText: {
    fontFamily: Fonts.gilroyMedium,
    fontSize: 18,
    color: "#fff",
    marginLeft: 20,
  },
  sortButtonContainer: {
    height: 66,
    width: "100%",
    backgroundColor: "#7154ca",
    borderRadius: 66 / 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sortButtonText: {
    marginLeft: 12,
    fontFamily: Fonts.gilroyMedium,
    fontSize: 18,
    color: "#fff",
  },
});
