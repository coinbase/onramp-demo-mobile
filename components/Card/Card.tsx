import { useThemeColor } from "@/hooks/useThemeColor";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  bordered?: boolean;
};

export const Card = memo(({ children, bordered }: CardProps) => {
  const backgroundColor = useThemeColor({}, "background");
  const line = useThemeColor({}, "line");
  return (
    <View
      style={[
        styles.card,
        { backgroundColor, borderColor: line, borderWidth: bordered ? 1 : 0 },
      ]}
    >
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },

  cardContent: {
    padding: 24,
    gap: 16,
  },
});
