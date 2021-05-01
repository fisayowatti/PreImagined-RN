// @flow
import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export interface ProfileModel {
  id: string;
  name: string;
  age: number;
  profile: number;
}

const { width, height } = Dimensions.get("window");
export const α = Math.PI / 12;
export const A = height * Math.sin(α) + width * Math.cos(α);
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
  },
  name: {
    color: "white",
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
});

interface CardProps {
  profile: ProfileModel;
  onTop: boolean;
  translateX: Animated.SharedValue<number>;
  translateY: Animated.SharedValue<number>;
  scale: Animated.SharedValue<number>;
}

const Profile = ({
  profile,
  translateX,
  translateY,
  scale,
  onTop,
}: CardProps) => {
  const like = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, width / 4],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  const nope = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, -width / 4],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        {
          rotateZ: interpolate(
            translateX.value,
            [-width / 2, 0, width / 2],
            [α, 0, -α]
          ),
        },
        {
          scale: onTop ? 1 : scale.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}>
      <Image style={styles.image} source={profile.profile} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View style={[styles.like, like]}>
            <Text style={styles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.nope, nope]}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{profile.name}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default Profile;
