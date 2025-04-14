import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/utils/colors";

const Input = (props: TextInputProps) => {
  const { style, ...rest } = props;

  return (
    <TextInput
      placeholderTextColor={colors.Gray}
      {...rest}
      style={StyleSheet.flatten([
        {
          padding: 10,
          fontSize: 16,
          borderRadius: 10,
          backgroundColor: colors.Secondary,
          color: "#fff",
        },
        style,
      ])}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});
