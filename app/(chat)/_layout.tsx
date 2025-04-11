import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IconSymbol } from "@/components/IconSymbol";

const RootLayout = () => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: "Chat Rooms",
          headerStyle: {
            paddingVertical: 20,
          },

          headerLeft: (props) => (
            <Link href={"/profile"}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
            </Link>
          ),

          headerRight: () => (
            <Link href="/new-room">
              <Text style={{ fontSize: 24, color: "#fff" }}>+</Text>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="profile"
        options={{ presentation: "modal", headerTitle: "Profile" }}
      />
      <Stack.Screen
        name="new-room"
        options={{
          presentation: "modal",
          headerTitle: "New Chat Room",
          // headerLeft:()=>{
          //   <Link dismissTo href={"/"}>
          //     <IconSymbol name="chevron.left"/>
          //   </Link>
          // }
        }}
      />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
