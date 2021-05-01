import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./src/Routes";
import Examples from "./src/Examples";
import Swiping, { swipingAssets } from "./src/Swiping";
import { LoadAssets } from "./src/components";
import Scrollflip from "./src/ScrollFlip";
import FloppyBg from "./src/Floppy";

const assets = [...swipingAssets];
const Stack = createStackNavigator<Routes>();
const App = () => (
  <LoadAssets assets={assets}>
    <Stack.Navigator>
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{
          title: "PreImagined",
        }}
      />
      <Stack.Screen
        name="Swiping"
        component={Swiping}
        options={{
          title: "Swiping",
        }}
      />
      <Stack.Screen
        name="ScrollFlip"
        component={Scrollflip}
        options={{
          headerShown: false,
          // title: "ScrollFlip",
        }}
      />
      <Stack.Screen
        name="FloppyBg"
        component={FloppyBg}
        options={{
          headerShown: false,
          // title: "ScrollFlip",
        }}
      />
    </Stack.Navigator>
  </LoadAssets>
);

export default App;
