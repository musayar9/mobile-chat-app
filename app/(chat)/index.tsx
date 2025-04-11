import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "@/components/Text";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const index = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  // console.log("user chat", user);
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/(auth)");
  };
  return (
    <View>
      <Text>Chat</Text>

      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
