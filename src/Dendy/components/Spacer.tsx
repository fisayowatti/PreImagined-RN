import React from "react";
import { View } from "react-native";

interface SpacerProps {
  xSpace?: number;
  ySpace?: number;
}

export default function Spacer({ xSpace, ySpace }: SpacerProps) {
  return (
    <View
      style={{
        height: ySpace ? ySpace : 0,
        width: xSpace ? xSpace : 0,
      }}
    />
  );
}
