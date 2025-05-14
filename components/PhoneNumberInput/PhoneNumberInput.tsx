import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { CountrySelector } from "../CountrySelector/CountrySelector";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface PhoneNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  label?: string;
  onClear?: () => void;
}

const DEFAULT_COUNTRY = {
  code: "US",
  name: "United States",
  flag: "🇺🇸",
  dialCode: "+1",
};

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChangeText,
  error,
  placeholder = "Phone Number",
  label,
  onClear,
}) => {
  const [displayValue, setDisplayValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const lineColor = useThemeColor({}, "line");
  const errorColor = useThemeColor({}, "negative");
  const placeholderColor = useThemeColor({}, "foregroundMuted");
  const textColor = useThemeColor({}, "foreground");

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = "";
    if (cleaned.length > 0) {
      formatted = "(" + cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += ") " + cleaned.substring(3, 6);
    }
    if (cleaned.length > 6) {
      formatted += "-" + cleaned.substring(6, 10);
    }
    return formatted;
  };

  // Update display value when value changes
  useEffect(() => {
    // Remove country code from value for display
    const numberWithoutCountryCode = value.replace(
      selectedCountry.dialCode,
      ""
    );
    setDisplayValue(formatPhoneNumber(numberWithoutCountryCode));
  }, [value, selectedCountry.dialCode]);

  const handleInputChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    setDisplayValue(formatPhoneNumber(cleaned));
    const fullNumber = selectedCountry.dialCode + cleaned;
    onChangeText(fullNumber);
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    // Get the current number without country code
    const currentNumber = value.replace(selectedCountry.dialCode, "");
    // Update with new country code
    const fullNumber = country.dialCode + currentNumber;
    onChangeText(fullNumber);
  };

  const handleClear = useCallback(() => {
    setDisplayValue("");
    onClear?.();
  }, [onClear]);

  return (
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <ThemedView
        style={[
          styles.inputContainer,
          { borderColor: error ? errorColor : lineColor },
        ]}
      >
        <CountrySelector
          selectedCountry={selectedCountry}
          onSelect={handleCountrySelect}
        />
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={displayValue}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          keyboardType="phone-pad"
          maxLength={14} // (123) 456-7890
        />
        {displayValue.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={placeholderColor} />
          </TouchableOpacity>
        )}
      </ThemedView>
      {error && (
        <ThemedText style={[styles.error, { color: errorColor }]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    paddingHorizontal: 12,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
  clearButton: {
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});
