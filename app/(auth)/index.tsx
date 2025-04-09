import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "@/components/Text";
import Button from "@/components/Button";

import * as WebBrowser from "expo-web-browser";
import { useSSO } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
WebBrowser.maybeCompleteAuthSession();
const index = () => {
  const { startSSOFlow } = useSSO();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  
  const handleSignInWithGoogle = async()=>{
  
  }
  
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <View style={{ flex: 0.1 }} />
        <View style={{ gap: 20, alignItems: "center" }}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>
            Modern Chat App
          </Text>
          <Text>The best chat app in the world</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ marginVertical: 32, gap: 10, width: "100%" }}>
          <Button>Sign in with passkey</Button>
          <Button
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ color: "black", fontWeight: "500" }}>
              Continue with google
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
