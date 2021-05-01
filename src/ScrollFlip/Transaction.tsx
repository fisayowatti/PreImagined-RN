import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const IMAGE_SIZE = 50;
const WHITE = "#DDDDDF";
const GREEN = "#549481";
const GREY = "#5B5A5E";

export enum TransactionType {
  credit,
  debit,
}

interface TransactionProps {
  transaction: {
    image: string;
    date: string;
    name: string;
    category: string;
    amount: string;
    type: string;
  };
}

export default function Transaction({
  transaction: { image, name, category, amount, type },
}: TransactionProps) {
  //   const source =
  //     name.includes("Mc") || name.includes("iT") || name.includes("Air")
  //       ? require("../../assets/mcdonalds.png")
  //       : { uri: image };

  const source = name.includes("Mc")
    ? require("../../assets/mcdonalds.png")
    : name.includes("iT")
    ? require("../../assets/apple.png")
    : name.includes("Air")
    ? require("../../assets/airbnb.png")
    : { uri: image };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        source={source}
      />
      <View style={styles.text}>
        <Text style={styles.textMajor}>{name}</Text>
        <Text style={styles.textMinor}>{category}</Text>
      </View>
      <Text
        style={[{ color: type == "credit" ? GREEN : WHITE }, styles.amount]}
      >
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "center",
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 50,
    marginRight: 20,
  },
  text: {
    flexDirection: "column",
  },
  textMajor: {
    fontSize: 18,
    fontWeight: "bold",
    color: WHITE,
    marginBottom: 4,
  },
  textMinor: {
    fontSize: 14,
    color: GREY,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: "auto",
  },
});
