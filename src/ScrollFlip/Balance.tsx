import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Text,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

interface BalanceProps {
  y: Animated.SharedValue<number>;
}

export default function Balance({ y }: BalanceProps) {
  const marginTop = useDerivedValue(() => {
    return interpolate(
      y.value,
      [0, 20, 100, 150],
      [100, 120, 200, 250],
      Extrapolate.CLAMP
    );
  });
  const marginBottom = useDerivedValue(() => {
    return interpolate(
      y.value,
      [100, 150, 175, 200],
      [0, -40, -40, -80],
      Extrapolate.CLAMP
    );
  });
  const balanceStyle = useAnimatedStyle(() => {
    const opacity = withTiming(y.value >= 197 ? 0 : 1, { duration: 100 });
    return {
      marginTop: marginTop.value,
      marginBottom: marginBottom.value,
      opacity,
    };
  });
  return (
    <Animated.View style={[styles.container, balanceStyle]}>
      <Text style={styles.balance}>$26,710</Text>
      <Text style={styles.label}>Total balance</Text>
    </Animated.View>
  );
}

interface Styles {
  container: ViewStyle;
  balance: TextStyle;
  label: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    marginTop: 100,
    marginHorizontal: 16,
    zIndex: 10,
  },
  balance: {
    fontSize: 32,
    color: "#fff",
  },
  label: {
    fontSize: 13,
    color: "#fff",
    opacity: 0.7,
  },
});
