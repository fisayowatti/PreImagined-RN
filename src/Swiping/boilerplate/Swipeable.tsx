import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Profile, { A, ProfileModel } from "./Profile";

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
  scale: Animated.SharedValue<number>;
}

export interface SwiperRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

const snapPoints = [-A, 0, A];
const { width } = Dimensions.get("window");

const swipeOut = (
  translateX: Animated.SharedValue<number>,
  dest: number,
  velocity: number,
  onSwipe: () => void
) => {
  "worklet";
  translateX.value = withSpring(
    dest,
    {
      velocity,
      restSpeedThreshold: dest === 0 ? 0.01 : 100,
      restDisplacementThreshold: dest === 0 ? 0.01 : 100,
    },
    () => {
      //if you either swiped left or swiped right successfully
      //run onSwipe to update the order of cards
      if (dest !== 0) {
        runOnJS(onSwipe)();
      }
    }
  );
};

const Swiper = (
  { profile, onTop, onSwipe, scale }: SwiperProps,
  ref: Ref<SwiperRef>
) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      swipeOut(translateX, -A, 15, onSwipe);
    },
    swipeRight: () => {
      swipeOut(translateX, A, 15, onSwipe);
    },
  }));

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetX: number; offsetY: number }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.offsetX + translationX;
      translateY.value = ctx.offsetY + translationY;
      scale.value = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [1, 0.8, 1],
        Extrapolate.CLAMP
      );
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      swipeOut(translateX, dest, velocityX, onSwipe);
      translateY.value = withSpring(0, { velocity: velocityY });
    },
  });

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View style={[StyleSheet.absoluteFillObject]}>
        <Profile {...{ profile, onTop, translateX, translateY, scale }} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default forwardRef(Swiper);
