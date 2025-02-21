import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";

type InputProps = {
  label?: string;
  placeholder: string;
  keyboardType?: "default" | "numeric";
  value: string;
  onChangeText: (text: string) => void;
  hideLabel?: boolean;
  hint?: string;
  prefix?: string;
};

export const Input = ({
  label,
  placeholder,
  keyboardType = "default",
  value,
  onChangeText,
  hideLabel = false,
  hint,
  prefix,
}: InputProps) => {
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      {!hideLabel && label && (
        <ThemedText style={styles.label}>{label}</ThemedText>
      )}
      <View style={styles.inputWrapper}>
        {prefix && <ThemedText style={styles.prefix}>{prefix}</ThemedText>}
        <TextInput
          style={[
            styles.input,
            prefix && styles.inputWithPrefix,
            { color: textColor },
          ]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={useThemeColor({}, "icon")}
        />
      </View>
      {hint && <ThemedText style={styles.hint}>{hint}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  label: {
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E8EB",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    height: 40,
    paddingHorizontal: 12,
    fontSize: 16,
    flex: 1,
  },
  inputWithPrefix: {
    paddingLeft: 0,
  },
  prefix: {
    paddingLeft: 12,
    paddingRight: 4,
    fontSize: 16,
    opacity: 0.7,
  },
  hint: {
    fontSize: 12,
    opacity: 0.5,
    marginLeft: 4,
  },
});
