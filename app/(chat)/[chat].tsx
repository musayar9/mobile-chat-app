import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const Chat = () => {
  const params = useLocalSearchParams();
  console.log("params", params);
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
