import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Platform, ScrollView } from "react-native";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Cards from "./Cards";
import Balance from "./Balance";
import Header from "./Header";
import Transaction from "./Transaction";
import SearchResult from "./SearchResult";
import Feature from "./Feature";

const sectionTitles = ["April", "March"];
const transactions = [
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "April 2021",
    time: "12:04",
    name: "AirBnb",
    category: "Housing",
    amount: "-$3.22",
    type: "debit",
  },
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "April 2021",
    time: "12:04",
    name: "Alex Johnson",
    category: "Recharge cards",
    amount: "$15.00",
    type: "credit",
  },
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "April 2021",
    time: "12:04",
    name: "iTunes Store",
    category: "Products and supermarket",
    amount: "-$21.05",
    type: "debit",
  },
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "April 2021",
    time: "12:04",
    name: "McDonalds",
    category: "Products and supermarket",
    amount: "-$15.00",
    type: "debit",
  },
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "April 2021",
    time: "12:04",
    name: "Roger Guerrero",
    category: "Recharge cards",
    amount: "$10.50",
    type: "credit",
  },
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "March 2021",
    time: "12:04",
    name: "McDonalds",
    category: "Products and supermarket",
    amount: "-$11.25",
    type: "debit",
  },
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "March 2021",
    time: "12:04",
    name: "Stella Williams",
    category: "Recharge cards",
    amount: "$11.25",
    type: "credit",
  },
  {
    image: "https://source.unsplash.com/random/600x600",
    date: "March 2021",
    time: "12:04",
    name: "Delia Morales",
    category: "Transfer to card",
    amount: "-$150.00",
    type: "debit",
  },
];

const features = [
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
  {
    name: "Unlock travel insurance",
    subtext: "Unlock insurance",
  },
];

const HEADER_HEIGHT = 200;

// const referenceDate = new Date();
// console.log("ref", referenceDate);
export default function Scrollflip() {
  const y = useSharedValue(0);
  const firstSectionY = useSharedValue(0);
  const secondSectionY = useSharedValue(0);

  const flatWidth = useSharedValue("100%");
  const hasScrollStarted = useSharedValue(false);

  const firstSectionRef = useAnimatedRef();
  const secondSectionRef = useAnimatedRef();

  const searchButtonClicked = useSharedValue(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const searchResultReveal = useSharedValue(false);

  // const [alreadyRender, setAlreadyRender] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!alreadyRender) return;
  //   runOnUI(() => {
  //     "worklet";
  //     console.log(Platform.OS, measure(firstSectionRef));
  //   })();
  // }, [alreadyRender]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      y.value = event.contentOffset.y;
      firstSectionY.value = measure(firstSectionRef).pageY;

      secondSectionY.value = measure(secondSectionRef).pageY;

      console.log(
        "yPos",
        y.value,
        firstSectionY.value,
        secondSectionY.value
        // event
      );
    },
    onBeginDrag: () => {
      flatWidth.value = "200%";
      hasScrollStarted.value = true;
    },
    onEndDrag: () => {
      if (y.value <= 45) {
        flatWidth.value = "100%";
      }
    },
  });

  const setSearchResultReveal = (value: boolean) => {
    "worklet";
    searchResultReveal.value = value;
  };

  const onSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length <= 1) {
      runOnUI(setSearchResultReveal)(false);
    } else {
      runOnUI(setSearchResultReveal)(true);
    }
  };

  const mainScrollViewStyle = useAnimatedStyle(() => {
    return {
      opacity: searchButtonClicked.value ? 0 : 1,
      zIndex: searchButtonClicked.value ? 0 : 1,
    };
  });

  const searchScrollViewStyle = useAnimatedStyle(() => {
    return {
      opacity: searchButtonClicked.value ? 1 : 0,
      zIndex: searchButtonClicked.value ? 1 : 0,
      transform: [
        {
          translateY: withTiming(searchResultReveal.value ? 0 : -60, {
            duration: 400,
          }),
        },
      ],
    };
  });

  const searchResultsStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(searchResultReveal.value ? 1 : 0, { duration: 400 }),
    };
  });

  console.log("hubris", searchQuery);

  return (
    <View
      style={styles.container}
      // onLayout={() => setAlreadyRender(true)}
    >
      <Header
        {...{
          firstSectionY,
          secondSectionY,
          sectionTitles,
          hasScrollStarted,
          searchButtonClicked,
          onSearch,
        }}
      />

      <Animated.ScrollView
        bounces={false}
        style={[styles.searchScrollView, searchScrollViewStyle]}
      >
        <Animated.View style={[{ flex: 1 }, searchResultsStyle]}>
          {transactions
            .filter((item) => item.name.includes(searchQuery) && searchQuery)
            .map((item, index) => (
              <SearchResult key={index} searchResult={item} index={index} />
            ))}
        </Animated.View>
      </Animated.ScrollView>

      <Animated.ScrollView
        // stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        {...{ onScroll }}
        style={[styles.mainScrollView, mainScrollViewStyle]}
      >
        <Balance {...{ y }} />

        <Cards {...{ y, flatWidth }} />

        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginBottom: 70 }}>
            <View ref={firstSectionRef}>
              <Text style={styles.sectionHeader}>Latest Transactions</Text>
            </View>
            {transactions
              .filter((item) => item.date.includes(sectionTitles[0]))
              .map((item, index) => (
                <View key={index}>
                  <Transaction transaction={item} />
                </View>
              ))}
          </View>
          <View style={{ marginBottom: 70 }}>
            <View ref={secondSectionRef}>
              <Text style={styles.sectionHeader}>{sectionTitles[1]}</Text>
            </View>
            {transactions
              .filter((item) => item.date.includes(sectionTitles[1]))
              .map((item, index) => (
                <View key={index}>
                  <Transaction transaction={item} />
                </View>
              ))}
          </View>
          <View style={{ marginBottom: 70 }}>
            {features.map((item, index) => (
              <Feature key={index} name={item.name} subtext={item.subtext} />
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#0C0B0E",
  },
  sectionHeader: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  searchScrollView: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    transform: [{ translateY: -60 }],
  },
  mainScrollView: {},
});
