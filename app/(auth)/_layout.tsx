import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const RootLayout = () => {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return <Redirect href={"/(chat)"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
