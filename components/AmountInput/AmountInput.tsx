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

  const formatAmount = useCallback((amount: string) => {
    // Remove any non-digit and non-decimal characters
    const cleanAmount = amount.replace(/[^0-9.]/g, "");

    // Handle special cases
    if (cleanAmount === "") return "";
    if (cleanAmount === ".") return "0.";

    // If input starts with "0" followed by a number, insert decimal point
    if (cleanAmount.match(/^0[0-9]/)) {
      return cleanAmount.replace(/^0([0-9])/, "0.$1");
    }

    // Split into integer and decimal parts
    const parts = cleanAmount.split(".");

    // Handle integer part - remove leading zeros unless it's just "0"
    let integerPart = parts[0].replace(/^0+/, "") || "0";

    // If there's a decimal part
    if (parts.length > 1) {
      // Take only first 2 decimal places
      const decimalPart = parts[1].slice(0, 2);
      return `${integerPart}.${decimalPart}`;
    }

    return integerPart;
  }, []);

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
            inputMode="decimal"
            style={[styles.input, { color: textColor }]}
            value={value}
            onChangeText={handleChangeText}
            keyboardType="decimal-pad"
            maxLength={8}
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
