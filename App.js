import React, { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Login from "./src/Screen/Login";
import Home from "./src/Screen/Home"; // Import another screen
import SignUp from "./src/Screen/SignUp";
import Forgot from "./src/Screen/Forgot";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat 100": require("./src/fonts/Montserrat-Thin.ttf"),
    "Montserrat 200": require("./src/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat 300": require("./src/fonts/Montserrat-Light.ttf"),
    "Montserrat 400": require("./src/fonts/Montserrat-Regular.ttf"),
    "Montserrat 500": require("./src/fonts/Montserrat-Medium.ttf"),
    // "Montserrat 600": require("./src/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat 700": require("./src/fonts/Montserrat-Bold.ttf"),
    "Montserrat 800": require("./src/fonts/Montserrat-ExtraBold.ttf"),
    "QuickSand 300": require("./src/fonts/Quicksand-Light.ttf"),
    "QuickSand 400": require("./src/fonts/Quicksand-Regular.ttf"),
    "QuickSand 500": require("./src/fonts/Quicksand-Medium.ttf"),
    "QuickSand 600": require("./src/fonts/Quicksand-SemiBold.ttf"),
    // "QuickSand 700": require("./src/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
