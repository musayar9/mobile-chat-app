import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const RootLayout = () => {
    const { isSignedIn } = useUser();
    if (!isSignedIn) {
      return <Redirect href={"/(auth)"} />;
    }
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
