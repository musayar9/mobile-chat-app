import { StyleSheet, Text as RNText, TextProps, View } from "react-native";
import React from "react";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const Text = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <RNText style={[{ color: "white" }, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({});
