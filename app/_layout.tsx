import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });
  const [fontsLoaded, error] = useFonts({
    "quicksand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "quicksand-medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "quicksand-regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "quicksand-light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error(error.message);
      throw error;
    }
  }, [error, fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ConvexProvider client={convex}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ConvexProvider>
  );
}
