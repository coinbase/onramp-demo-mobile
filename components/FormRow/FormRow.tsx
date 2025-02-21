import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View, ViewStyle } from "react-native";

type FormRowProps = {
  label: string;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
};

export const FormRow = ({ label, children, containerStyle }: FormRowProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={styles.inputContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    opacity: 0.7,
    flex: 1,
  },
  inputContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
});
