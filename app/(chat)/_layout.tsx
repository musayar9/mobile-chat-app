import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IconSymbol } from "@/components/IconSymbol";

const RootLayout = () => {
  const router = useRouter();
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
          headerTitle: ` ${user?.fullName}`,
          headerStyle: {
            flexDirection: "column",
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

            // <TouchableOpacity
            //   onPress={() => router.push("/new-room")}
            //   style={{ padding: 20, zIndex:100 }}
            // >
            //   <Text style={{ fontSize: 24, color: "#fff" }}>+</Text>
            // </TouchableOpacity>
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

      <Stack.Screen
        name="[chat]"
        options={{
          headerTitle: "Chat",
        }}
      />

      <Stack.Screen
        name="settings/[chat]"
        options={{
          headerTitle: "Room Settings",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
