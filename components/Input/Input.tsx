import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";

type InputProps = {
  label: string;
  placeholder: string;
  keyboardType?: "default" | "numeric";
  value: string;
  onChangeText: (text: string) => void;
};

export const Input = ({
  label,
  placeholder,
  keyboardType = "default",
  value,
  onChangeText,
}: InputProps) => {
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={useThemeColor({}, "icon")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 14,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E6E8EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
