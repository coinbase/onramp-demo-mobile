import { Skeleton } from "@/components/Skeleton/Skeleton";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { memo } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";

type AmountInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  prefix?: string;
  isLoading?: boolean;
};

export const AmountInput = memo(
  ({ value, onChangeText, prefix, isLoading }: AmountInputProps) => {
    const textColor = useThemeColor({}, "foreground");

    if (isLoading) {
      return <Skeleton width={60} height={48} />;
    }

    return (
      <View style={styles.amountRow}>
        <View style={styles.inputGroup}>
          {prefix && (
            <ThemedText style={[styles.currency]}>{prefix}</ThemedText>
          )}
          <TextInput
            style={[styles.input, { color: textColor }]}
            value={value}
            onChangeText={onChangeText}
            placeholder="0"
            editable={true}
            selectTextOnFocus={true}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  }
);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const INPUT_WIDTH = SCREEN_WIDTH - 80;

const styles = StyleSheet.create({
  amountRow: {
    justifyContent: "center",
    height: 48,
    flex: 1,
    width: "100%",
  },
  inputGroup: {
    flexDirection: "row",
    maxWidth: INPUT_WIDTH,
    width: "100%",
  },
  input: {
    fontSize: 28,
    fontFamily: "CoinbaseDisplay-Regular",
    textAlign: "left",
    flex: 1,
  },
  currency: {
    fontSize: 28,
    lineHeight: 36,
    marginRight: 5,
    marginTop: 2,
    opacity: 0.7,
  },
});
