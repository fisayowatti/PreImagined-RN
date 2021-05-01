import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

const cards = [
  { balance: "$86,760", label: "Main Account" },
  { balance: "$4,302", label: "Vacation" },
  { balance: "$3,150", label: "Buy Tesla" },
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ProgressBar = () => {
  return (
    <View
      style={{
        width: 50,
        height: 3,
        backgroundColor: "#54535A",
        borderRadius: 4,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: 35,
          height: 3,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      />
    </View>
  );
};

interface CardsProps {
  y: Animated.SharedValue<number>;
  flatWidth: Animated.SharedValue<string>;
}

export default function Cards({ y, flatWidth }: CardsProps) {
  const inputRange = [20, 100];
  const rotateX = useDerivedValue(() => {
    return interpolate(y.value, inputRange, [0, 90], Extrapolate.CLAMP);
  });
  const opacity = useDerivedValue(() => {
    return interpolate(y.value, [20, 60, 100], [1, 0.7, 0], Extrapolate.CLAMP);
  });
  const marginTop = useDerivedValue(() => {
    return interpolate(
      y.value,
      [0, ...inputRange],
      [30, 30, -80],
      Extrapolate.CLAMP
    );
  });
  const marginBottom = useDerivedValue(() => {
    return interpolate(
      y.value,
      [0, ...inputRange],
      [60, 30, -10],
      Extrapolate.CLAMP
    );
  });

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    marginTop: marginTop.value,
    marginBottom: marginBottom.value,
    transform: [
      { perspective: 700 },
      { translateY: 100 / 2 },
      { rotateX: `${rotateX.value}deg` },
      { translateY: -100 / 2 },
    ],
  }));
  const flatStyle = useAnimatedStyle(() => ({
    width: flatWidth.value,
  }));
  return (
    <Animated.View style={[cardStyle]}>
      <AnimatedScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[flatStyle]}
      >
        <View style={[styles.card1, styles.card]}>
          <Image
            source={require("../../assets/mastercard-icon.png")}
            style={{ height: 21, width: 36, marginTop: 2, marginBottom: 46 }}
          />
          <Text style={styles.mainText}>{cards[0].balance}</Text>
          <Text style={styles.subText}>{cards[0].label}</Text>
        </View>
        <View style={[styles.card2, styles.card]}>
          <Text style={[styles.icon, { marginBottom: 27 }]}>🌴</Text>
          <ProgressBar />
          <Text style={styles.mainText}>{cards[1].balance}</Text>
          <Text style={styles.subText}>{cards[1].label}</Text>
        </View>
        <View style={[styles.card2, styles.card]}>
          <Text style={styles.icon}>⚡️</Text>
          <Text style={styles.mainText}>{cards[2].balance}</Text>
          <Text style={styles.subText}>{cards[2].label}</Text>
        </View>
        <View style={[styles.card3, styles.card]}>
          <Text style={styles.icon}>➕</Text>
          <Text style={styles.mainText}>NEW</Text>
          <Text style={styles.subText}>Space</Text>
        </View>
      </AnimatedScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  //   container: { marginLeft: 16 },
  card: {
    height: 162,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
    marginLeft: 16,
    borderRadius: 12,
  },
  card1: {
    width: 180,
    backgroundColor: "#3C3B4E",
  },
  card2: {
    width: 132,
    backgroundColor: "#17161D",
  },
  card3: {
    width: 132,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#17161D",
    marginRight: 16,
  },
  //   card3: {
  //     width: 200,
  //   },
  icon: {
    fontSize: 24,
    marginBottom: 40,
  },
  mainText: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 6,
  },
  subText: {
    fontSize: 15,
    color: "#fff",
    opacity: 0.7,
    marginBottom: 8,
  },
});
