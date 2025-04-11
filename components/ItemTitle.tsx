import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChatRoom } from "@/utils/types";
import { colors } from "@/utils/colors";

const ItemTitle = ({ title, isPrivate }: { title: string; isPrivate }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Text style={{ color: "white", fontSize: 18 }}>{title}</Text>
    </View>
  );
};

export default ItemTitle;

const styles = StyleSheet.create({});

export function ItemTitleDescription({
  title,
  description,
  isPrivate,
}: {
  title: string;
  description: string;
  isPrivate: boolean;
}) {
  return (
    <View style={{ gap: 4 }}>
      <ItemTitle title={title} isPrivate={isPrivate} />
      <Text style={{ fontSize: 13, color: colors.Gray }}>{description}</Text>
    </View>
  );
}
