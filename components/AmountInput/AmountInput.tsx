import { useCallback } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";

// Coinbase brand blue color
const COINBASE_BLUE = "#0052FF";

type AmountInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  prefix?: string;
  currency?: string;
};

export const AmountInput = ({
  value,
  onChangeText,
  prefix = "$",
  currency = "USD",
}: AmountInputProps) => {
  const textColor = COINBASE_BLUE;

  const formatAmount = useCallback(
    (amount: string) => {
      const cleanAmount = amount.replace(/[^0-9.]/g, "");
      const parts = cleanAmount.split(".");
      if (parts.length > 2) return value;
      if (parts[1]?.length > 2) {
        return `${parts[0]}.${parts[1].slice(0, 2)}`;
      }
      return cleanAmount;
    },
    [value]
  );

  const handleChangeText = (text: string) => {
    const formattedAmount = formatAmount(text);
    onChangeText(formattedAmount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.amountRow}>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.currencySymbol, { color: textColor }]}>
            {prefix}
          </ThemedText>
          <TextInput
            style={[styles.input, { color: textColor }]}
            value={value}
            onChangeText={handleChangeText}
            keyboardType="decimal-pad"
            maxLength={8}
            selectTextOnFocus
            placeholder="0"
            placeholderTextColor={`${textColor}4D`}
          />
        </View>
      </View>
    </View>
  );
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const INPUT_WIDTH = SCREEN_WIDTH - 80;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  amountRow: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: "100%",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: INPUT_WIDTH,
  },
  currencySymbol: {
    fontSize: 80,
    fontWeight: "500",
    lineHeight: 96,
    opacity: 0.7,
  },
  input: {
    fontSize: 80,
    fontWeight: "500",
    textAlign: "left",
    padding: 0,
    lineHeight: 96,
    maxWidth: INPUT_WIDTH - 60,
  },
});
