import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../data";

interface ItemProps {
  name: string;
  image: string;
  price: string;
  priceUnit: string;
}
export default function Item({ name, image, price, priceUnit }: ItemProps) {
  return (
    <View style={styles.container}>
      <Image height={156} source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsRow}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.priceUnit}>{priceUnit}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 230,
    padding: 10,
    borderWidth: 2,
    borderColor: "#f7f7f7",
    borderRadius: 10,
    marginBottom: 12,
  },
  image: {
    height: 156,
    borderRadius: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 230 - 156 - 10,
    // backgroundColor: "pink",
  },
  name: {
    fontFamily: Fonts.gilroySemibold,
    fontSize: 16,
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
});
