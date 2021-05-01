import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface SearchResultProps {
  index: number;
  searchResult: {
    image: string;
    date: string;
    time: string;
    name: string;
    amount: string;
    type: string;
  };
}

export default function SearchResult({
  searchResult: { image, name, date, time, amount, type },
  index,
}: SearchResultProps) {
  const source = name.includes("Mc")
    ? require("../../assets/mcdonalds.png")
    : { uri: image };
  return (
    <View style={styles.container} key={index}>
      <Image style={styles.image} height={60} width={60} source={source} />
      <View style={styles.text}>
        <Text style={styles.textMajor}>{name}</Text>
        <Text style={styles.textMinor}>{`${date} - ${time}`}</Text>
      </View>
      <Text
        style={[{ color: type == "credit" ? "green" : "white" }, styles.amount]}
      >
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginRight: 20,
  },
  text: {
    flexDirection: "column",
  },
  textMajor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  textMinor: {
    fontSize: 14,
    opacity: 0.5,
    color: "#fff",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: "auto",
  },
});
