import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "@/components/Text";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Button from "@/components/Button";
import { chatRooms } from "@/utils/test-data";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/utils/colors";
import ItemTitle, { ItemTitleDescription } from "@/components/ItemTitle";
const index = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  // console.log("user chat", user);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {};

  const handleSignOut = async () => {
    await signOut();
    router.push("/(auth)");
  };
  return (
    <View style={{ flex: 1, padding:16 }}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{
          // padding: 16,
          gap: 16,
        }}
        renderItem={({ item }) => (
          <Link href={{ pathname: "[chat]", params: { chat: item.id } }}>
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
