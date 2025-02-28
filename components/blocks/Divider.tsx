import { useThemeColor } from "@/hooks/useThemeColor";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type DividerProps = {
  marginHorizontal?: number;
};

export const Divider = memo(({ marginHorizontal = -32 }: DividerProps) => {
  const line = useThemeColor({}, "line");

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: line,
          marginHorizontal,
        },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
