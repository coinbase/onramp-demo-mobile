import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger";
  icon?: React.ReactNode;
};

const Button = ({ title, onPress, variant = "primary", icon }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "danger" && styles.dangerButton]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon}
        <ThemedText style={styles.text}>{title}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  dangerButton: {
    backgroundColor: "#FF3B30",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;
