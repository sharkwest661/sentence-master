// App.js
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@shopify/restyle";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LightFont from "./assets/fonts/WorkSans-Light.ttf";
import RegularFont from "./assets/fonts/WorkSans-Regular.ttf";
import MediumFont from "./assets/fonts/WorkSans-Medium.ttf";
import SemiBoldFont from "./assets/fonts/WorkSans-SemiBold.ttf";

import AppNavigator from "./src/navigation/AppNavigator";
import neoMemphisTheme from "./src/theme";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "WorkSans-Light": LightFont,
    "WorkSans-Regular": RegularFont,
    "WorkSans-Medium": MediumFont,
    "WorkSans-SemiBold": SemiBoldFont,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "WorkSans-Light": LightFont,
          "WorkSans-Regular": RegularFont,
          "WorkSans-Medium": MediumFont,
          "WorkSans-SemiBold": SemiBoldFont,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      // Hide splash screen
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={neoMemphisTheme}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
