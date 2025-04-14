import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Text from "@/components/Text";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link, useFocusEffect, useRouter } from "expo-router";
import Button from "@/components/Button";
import { chatRooms } from "@/utils/test-data";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/utils/colors";
import ItemTitle, { ItemTitleDescription } from "@/components/ItemTitle";
import { ChatRoom } from "@/utils/types";
import { appWriteConfig, db } from "@/utils/appwrite";
import { Query } from "react-native-appwrite";

// import { Client, Account, ID } from 'react-native-appwrite';

// const client = new Client()
//     .setProject('67fa317d0001e589b8cc')
//     .setPlatform('com.sayarmusa.modernchatvideo');

const index = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  // console.log("user chat", user);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const fetchChatRooms = async () => {
    try {
      const { documents, total } = await db.listDocuments(
        appWriteConfig.db,
        appWriteConfig.col.chatrooms,
        [Query.limit(100)]
      );
      console.log("docueents", JSON.stringify(documents, null, 2), total);

      setChatRooms(documents);
    } catch (error) {
      console.log("Chat Rooms Error", error);
    }
  };

  // useFocusEffect(() => {
  //   fetchChatRooms();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // Her sayfa açıldığında çalışır
      fetchChatRooms();

      return () => {
        // Sayfa focus dışı olduğunda (başka sayfaya geçince) çalışır
        console.log("Focus kaybedildi");
      };
    }, []) // burada bağımlılık yoksa sadece focus değişiminde tetiklenir
  );
  console.log(chatRooms, "chatRooms");
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchChatRooms();
    } catch (error) {
      console.log("error fetching chat rooms", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/(auth)");
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 6,
          paddingBottom: 8,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>New Chat</Text>
        <Link href="/new-room">
          <Text style={{ fontSize: 24, color: "#fff" }}>+</Text>
        </Link>
      </View>

      <FlatList
        data={chatRooms}
        keyExtractor={(item, index) => item.$id + index.toString()}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{
          // padding: 16,
          gap: 16,
        }}
        renderItem={({ item }) => (
          <Link href={{ pathname: "[chat]", params: { chat: item.$id } }}>
            <View
              style={{
                paddingVertical: 16,
                paddingHorizontal: 12,
                backgroundColor: colors.Secondary,
                flex: 1,
                width: "100%",
                gap: 6,
                borderRadius: 12,

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ItemTitleDescription
                title={item.title}
                description={item.description}
                isPrivate={false}
              />
              <IconSymbol name="chevron.right" />
            </View>
          </Link>
        )}
      />

      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
