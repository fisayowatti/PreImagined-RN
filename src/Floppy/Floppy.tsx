import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSpring } from "react-native-redash";

// const { width, height } = Dimensions.get("window");

const SHAPE_GAP = 10;
const SHAPE_ANGLE = "-19.84deg";
const SHAPE_WIDTH = 187;
const SHAPE_HEIGHT = 174;
const SHAPE_RADIUS = 100;

interface ShapeProps {
  color: string;
  end?: boolean;
  style?: any;
}

const Shape = ({ color, end, style }: ShapeProps) => {
  return (
    <Animated.View
      style={[
        styles.shape,
        {
          backgroundColor: color,
          // marginVertical: !end ? SHAPE_GAP : 0,
        },
        { ...style },
      ]}
    />
  );
};

export default function Floppy() {
  const move = useSharedValue(false);
  const [start, setStart] = useState(false);
  const transition = useSpring(start, {
    damping: 20,
    mass: 67.09,
    stiffness: 165,
    velocity: 2,
  });

  useEffect(() => {
    setStart(true);
    runOnUI(() => {
      "worklet";
      move.value = true;
    })();
  }, []);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // { perspective: 800 },
        // {
        //   translateX: withTiming(move.value ? 176 : 400, { duration: 3000 }),
        // }, //176 true
        // {
        //   translateY: withTiming(move.value ? -290 : -450, { duration: 3000 }), //-290 true
        // },
        // { rotateZ: SHAPE_ANGLE },
        // { rotateY: "-44deg" },
      ],
    };
  });

  const leftStyle = useAnimatedStyle(() => {
    const rotateY = withTiming(move.value ? 0 : 3.14, { duration: 3000 });
    return {
      // zIndex: 1,
      transform: [
        { translateX: SHAPE_WIDTH / 2 },
        { rotateY },
        { translateX: -(SHAPE_WIDTH / 2) },
      ],
    };
  });
  const rightStyle = useAnimatedStyle(() => {
    return {
      // zIndex: 2,
      marginLeft: SHAPE_GAP,
    };
  });

  const topLeftStyle = useAnimatedStyle(() => {
    const rotateX = withDelay(
      900,
      withTiming(move.value ? -2.5 : -Math.PI, { duration: 3000 }) // 0 true
    );
    // const rotateX = interpolate(transition.value, [0, 1], [-Math.PI, 0]);
    console.log(move.value, rotateX, Math.PI, start);
    return {
      position: "absolute",
      borderTopLeftRadius: SHAPE_RADIUS,
      borderTopRightRadius: SHAPE_RADIUS,
      borderBottomLeftRadius: SHAPE_RADIUS,
      // zIndex: 1,
      transform: [
        { perspective: 800 },
        { translateY: SHAPE_HEIGHT / 2 },
        { rotateX },
        { translateY: -(SHAPE_HEIGHT / 2) },
      ],
    };
  });

  const midLeftStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: SHAPE_HEIGHT + SHAPE_GAP,
      borderTopLeftRadius: SHAPE_RADIUS,
      borderBottomLeftRadius: SHAPE_RADIUS,
    };
  });

  const bottomLeftStyle = useAnimatedStyle(() => {
    const rotateX = withDelay(
      750,
      withTiming(move.value ? 0 : Math.PI, {
        duration: 3000,
      })
    );
    return {
      position: "absolute",
      top: (SHAPE_HEIGHT + SHAPE_GAP) * 2,
      borderTopLeftRadius: SHAPE_RADIUS,
      borderBottomLeftRadius: SHAPE_RADIUS,
      borderBottomRightRadius: SHAPE_RADIUS,
      // zIndex: 2,
      // transform: [
      //   { translateY: -(SHAPE_HEIGHT / 2) },
      //   { rotateX },
      //   { translateY: SHAPE_HEIGHT / 2 },
      // ],
    };
  });

  const topRightStyle = useAnimatedStyle(() => {
    const rotateX = withDelay(
      750,
      withTiming(move.value ? -1.5 : -Math.PI, { duration: 3000 })
    );

    return {
      position: "absolute",
      left: SHAPE_WIDTH + SHAPE_GAP,
      zIndex: 3,
      borderTopLeftRadius: SHAPE_RADIUS,
      borderTopRightRadius: SHAPE_RADIUS,
      borderBottomRightRadius: SHAPE_RADIUS,
      transform: [
        // { rotateY: "-10deg" },
        { perspective: 800 },
        { translateY: SHAPE_HEIGHT / 2 },
        { rotateX },
        { translateY: -(SHAPE_HEIGHT / 2) },
        // { rotateY: "50deg" },
      ],
    };
  });

  const midRightStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: SHAPE_WIDTH + SHAPE_GAP,
      top: SHAPE_HEIGHT + SHAPE_GAP,
      borderTopRightRadius: SHAPE_RADIUS,
      borderBottomRightRadius: SHAPE_RADIUS,
    };
  });

  console.log("start", start);

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Shape color="#747cf9" end style={topLeftStyle} />
      <Shape color="#eb5072" style={midLeftStyle} />
      <Shape color="#52f090" end style={bottomLeftStyle} />
      <Shape color="#52f090" end style={topRightStyle} />
      <Shape color="#ef66b4" style={midRightStyle} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: SHAPE_GAP + SHAPE_WIDTH * 2,
    height: SHAPE_GAP * 2 + SHAPE_HEIGHT * 3,
    // top: "50%",
    // left: "50%",
  },
  shape: {
    height: 174,
    width: 187,
  },
});
