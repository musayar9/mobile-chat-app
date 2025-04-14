import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { colors } from "@/utils/colors";
import { isLoading } from "expo-font";
import { LegendList } from "@legendapp/list";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useUser } from "@clerk/clerk-expo";
import { appWriteConfig, client, db } from "@/utils/appwrite";
import { ID, Query } from "react-native-appwrite";
import { ChatRoom, Message } from "@/utils/types";
import { chatRooms } from "@/utils/test-data";
import Text from "@/components/Text";

const Chat = () => {
  const { user } = useUser();
  const { chat: chatId } = useLocalSearchParams();
  if (!chatId) {
    return <Text>We couldn't find this chat room 😊</Text>;
  }
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const headerHeight = Platform.OS === "ios" ? useHeaderHeight() : 0;

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await getMessages();
          await getChatRoom();
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }, [chatId])
  );
  useEffect(() => {
    // chat room güncellemelerini dinlemek için channel oluşturma
    const channel = `databases.${appWriteConfig.db}.collections.${appWriteConfig.col.chatrooms}.documents.${chatId}`;

    const unsubscribe = client.subscribe(channel, () => {
      console.log("chat room updated");
      getMessages();
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);
  const getChatRoom = async () => {
    try {
      const data = await db.getDocument(
        appWriteConfig.db,
        appWriteConfig.col.chatrooms,
        chatId as string
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMessages = async () => {
    try {
      const { documents, total } = await db.listDocuments(
        appWriteConfig.db,
        appWriteConfig.col.messages,
        [
          Query.equal("chatRoomId", chatId as string),
          Query.limit(100),
          Query.orderAsc("$createdAt"),
        ]
      );

      setMessages(documents as Message[]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (messageContent.trim() === "") return;

    try {
      const message = {
        content: messageContent,
        senderId: user?.id,
        senderName: user?.fullName,
        senderPhoto: user?.imageUrl,
        chatRoomId: chatId,
      };

      await db.createDocument(
        appWriteConfig.db,
        appWriteConfig.col.messages,
        ID.unique(),
        message
      );
      setMessageContent("");

      await db.updateDocument(
        appWriteConfig.db,
        appWriteConfig.col.chatrooms,
        chatId as string,
        { $updatedAt: new Date().toISOString() }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  console.log("messa", JSON.stringify(messages, null, 2));
  return (
    <>
      <Stack.Screen options={{ title: chatRoom?.title }} />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={headerHeight}
        >
          <LegendList
            data={messages}
            renderItem={({ item }) => {
              const isSender = item?.senderId === user?.id;

              return (
                <View
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                    gap: 6,
                    maxWidth: "80%",
                    alignSelf: isSender ? "flex-end" : "flex-start",
                  }}
                >
                  <Image
                    source={{ uri: item?.senderPhoto }}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                  />

                  <View
                    style={{
                      backgroundColor: isSender ? "#00bc7d" : colors.Secondary,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 10,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      {item?.senderName}
                    </Text>
                    <Text style={{ color: "#fff" }}>{item?.content}</Text>

                    <Text style={{ fontSize: 10, textAlign: "right" }}>
                      {new Date(item?.$createdAt!).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item?.$id}
            contentContainerStyle={{ padding: 10 }}
            recycleItems={true}
            initialScrollIndex={messages.length - 1}
            alignItemsAtEnd
            maintainScrollAtEnd
            maintainScrollAtEndThreshold={0.5}
            maintainVisibleContentPosition
            estimatedItemSize={100}
          />

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              backgroundColor: colors.Secondary,
              borderWidth: 1,
              borderColor: messageContent === "" ? colors.Gray : "#00bc7d",
              borderRadius: 12,
              marginBottom: 8,
              marginHorizontal: 10,
            }}
          >
            <TextInput
              placeholder="Message"
              value={messageContent}
              onChangeText={setMessageContent}
              style={{
                flexGrow: 1,
                color: "#fff",
                minHeight: 40,
                // paddingRight: 44,
                // left: 8,
                flexShrink: 1,
                padding: 10,
                letterSpacing: 0.5,
              }}
              placeholderTextColor={"#fff"}
              multiline
            />

            <Pressable
              onPress={sendMessage}
              disabled={messageContent === ""}
              style={{
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSymbol
                name="paperplane.fill"
                color={messageContent === "" ? colors.Gray : "#00bc7d"}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({});
