import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSSO,
  useUser,
} from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();
const index = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const { user } = useUser();
  console.log("user", user);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const { setActive, signIn } = useSignIn();
  const handleSignInWithGoogle = async () => {
    console.log("sginged");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        // router.push("/(chat)");
      } else {
        // there is  no session
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        console.log("error", error);
        throw error;
      }
    }
  };

  const handleSignInWithPasskey = async () => {
    try {
      const signInAttempt = await signIn?.authenticateWithPasskey({
        flow: "discoverable",
      });

      if (signInAttempt?.status === "complete") {
        if (setActive !== undefined) {
          await setActive({ session: signInAttempt.createdSessionId });
        }
      } else {
        console.log("error:", JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        console.log("error", error);
        throw error;
      }
    }
  };

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

          {
            !errors?.map((error) => (
              <Text
                key={error.code}
                style={{ color: "red", fontSize: 14, fontFamily: "500" }}
              >
                {error.message}
              </Text>
            ))
          }
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
            onPress={handleSignInWithGoogle}
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
