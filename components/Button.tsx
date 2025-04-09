import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

const Button = ({ children, style, ...props }: PressableProps) => {
  return (
    <Pressable
      style={[
        {
          backgroundColor: "white",
          padding: 14,
          borderRadius: 14,
          width: "100%",
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text style={{ textAlign: "center", fontWeight: 500 }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
