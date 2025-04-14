import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Input from "@/components/Input";
import { Stack, useRouter } from "expo-router";
import { appWriteConfig, db } from "@/utils/appwrite";
import { ID } from "react-native-appwrite";

const NewRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleCreateRoom = async () => {
    try {
      setIsLoading(true);
      await db.createDocument(
        appWriteConfig.db,
        appWriteConfig.col.chatrooms,
        ID.unique(),
        { title: roomName, description: roomDescription }
      );
      router.back();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              disabled={roomName === " " || isLoading}
              onPress={handleCreateRoom}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
                {isLoading ? "Creating" : "Create"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ padding: 16, gap: 16 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: 500 }}>
          New Room
        </Text>

        <Input
          placeholder="Room Name"
          value={roomName}
          onChangeText={setRoomName}
          maxLength={200}
        />
        <Input
          placeholder="Room Description"
          value={roomDescription}
          onChangeText={setRoomDescription}
          maxLength={500}
          style={{ height: 100 }}
          textAlignVertical="top"
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          disabled={roomName === " " || isLoading}
          onPress={handleCreateRoom}
        >
          <Text style={{ color: "#111", fontSize: 16, fontWeight: "500" }}>
            {isLoading ? "Creating" : "Create"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NewRoom;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
