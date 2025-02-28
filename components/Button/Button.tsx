import { useThemeColor } from "@/hooks/useThemeColor";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger";
  icon?: React.ReactNode;
  disabled?: boolean;
};

export const Button = memo(
  ({ title, onPress, variant = "primary", icon, disabled }: ButtonProps) => {
    const buttonColor = useThemeColor({}, "foreground");
    const buttonTextColor = useThemeColor({}, "primaryForeground");

    return (
      <TouchableOpacity
        style={[
          styles.button,
          variant === "danger" && styles.dangerButton,
          disabled && styles.disabledButton,
          { backgroundColor: buttonColor },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.content}>
          {icon}
          <ThemedText font="medium" style={[{ color: buttonTextColor }]}>
            {title}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
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
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "grey",
  },
});

export default Button;
