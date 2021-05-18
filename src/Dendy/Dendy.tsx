import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { StackCardInterpolationProps } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { useSharedValue } from "react-native-reanimated";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

import Detail from "./Detail";
import Success from "./Success";
import Menu from "./Menu";
import Category from "./Category";

const Stack = createSharedElementStackNavigator();

export default function DendyNavigation() {
  const options = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({
      current: { progress },
    }: StackCardInterpolationProps) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none" initialRouteName="Dendy">
        <Stack.Screen name="Dendy" component={Dendy} options={() => options} />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={() => options}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

interface DendyProps {
  navigation: any;
  route: RouteProp<Record<string, object | undefined>, string>;
}

function Dendy(props: DendyProps) {
  const [fontsLoaded] = useFonts({
    "Gilroy-Regular": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-SemiBold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
  });

  const menuActive = useSharedValue(false);

  const selectedOption = useSharedValue("home");

  console.log("stuff", selectedOption.value, menuActive.value);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Fragment>
        <View style={styles.container}>
          <Category selectedOption={selectedOption} {...props} />
          <Menu {...{ menuActive, selectedOption }} />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09071d",
  },
});
