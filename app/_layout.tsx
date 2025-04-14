import { Slot, Stack } from "expo-router";
import { ClerkLoaded, ClerkProvider, useUser } from "@clerk/clerk-expo";
import { passkeys } from "@clerk/expo-passkeys";
import { tokenCache } from "@/utils/cache";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { Platform, StatusBar } from "react-native";

let passkeysOption = undefined;

if (Platform.OS !== "web") {
  try {
    const passkeysModule = require("@clerk/expo-passkeys");
    passkeysOption = passkeysModule.passkeys;
  } catch (error) {
    console.warn("Passkeys modülü yüklenemedi:", error);
  }
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("Missing Publishable Key");
  }


  // console.log("passkeysOption", passkeys);
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
      __experimental_passkeys={passkeysOption}
    >
      <StatusBar translucent backgroundColor={"transparent"} />
      <ClerkLoaded>
        <ThemeProvider value={DarkTheme}>
          <Slot />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
