import { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type RowSpaceBetweenProps = {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
};

export const RowSpaceBetween = memo(
  ({ children, containerStyle }: RowSpaceBetweenProps) => {
    return <View style={[styles.container, containerStyle]}>{children}</View>;
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
