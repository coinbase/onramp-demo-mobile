import { CoinbaseDisplayFonts } from "@/assets/fonts";
import { AppProvider } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { BottomSheetProvider } from "@/components/BottomSheet/BottomSheetProvider";
import { LoadingOverlay } from "@/components/LoadingOverlay/LoadingOverlay";
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from "@/constants/constants";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { PrivyElements, PrivyProvider } from "@privy-io/expo";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "CoinbaseDisplay-Regular": CoinbaseDisplayFonts.Regular,
    "CoinbaseDisplay-Medium": CoinbaseDisplayFonts.Medium,
    "CoinbaseDisplay-Bold": CoinbaseDisplayFonts.Bold,
    "CoinbaseDisplay-ExtraLight": CoinbaseDisplayFonts.ExtraLight,
    "CoinbaseDisplay-Light": CoinbaseDisplayFonts.Light,
    "CoinbaseDisplay-MediumItalic": CoinbaseDisplayFonts.MediumItalic,
    "CoinbaseDisplay-BoldItalic": CoinbaseDisplayFonts.BoldItalic,
    "CoinbaseDisplay-ExtraLightItalic": CoinbaseDisplayFonts.ExtraLightItalic,
    "CoinbaseDisplay-LightItalic": CoinbaseDisplayFonts.LightItalic,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PrivyProvider
          appId={PRIVY_APP_ID}
          clientId={PRIVY_CLIENT_ID}
          // supportedChains={[base, polygon, unichain]}
        >
          <PrivyElements />
          <AppProvider>
            <BottomSheetModalProvider>
              <BottomSheetProvider>
                <Slot />
                {loaded && <LoadingOverlay />}
              </BottomSheetProvider>
            </BottomSheetModalProvider>
          </AppProvider>
        </PrivyProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const scheme = "onrampdemo";
