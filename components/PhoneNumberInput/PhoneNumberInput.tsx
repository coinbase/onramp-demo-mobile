import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CountrySelector } from '../CountrySelector/CountrySelector';

interface PhoneNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  label?: string;
}

const DEFAULT_COUNTRY = {
  code: 'US',
  name: 'United States',
  flag: '🇺🇸',
  dialCode: '+1',
};

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChangeText,
  error,
  placeholder = 'Phone Number',
  label,
}) => {
  const [formattedNumber, setFormattedNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const lineColor = useThemeColor({}, 'line');
  const errorColor = useThemeColor({}, 'negative');
  const placeholderColor = useThemeColor({}, 'foregroundMuted');

  useEffect(() => {
    // Format the phone number as user types
    const formatPhoneNumber = (text: string) => {
      // Remove all non-digit characters
      const cleaned = text.replace(/\D/g, '');
      
      // Format based on length
      let formatted = '';
      if (cleaned.length > 0) {
        formatted = '(' + cleaned.substring(0, 3);
      }
      if (cleaned.length > 3) {
        formatted += ') ' + cleaned.substring(3, 6);
      }
      if (cleaned.length > 6) {
        formatted += '-' + cleaned.substring(6, 10);
      }
      
      setFormattedNumber(formatted);
      // Pass the cleaned number back to parent
      onChangeText(cleaned);
    };

    formatPhoneNumber(value);
  }, [value, onChangeText]);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    // You might want to handle the country code change here
    // For example, if you need to update the full phone number with the new country code
  };

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText style={styles.label}>{label}</ThemedText>
      )}
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
          style={styles.input}
          value={formattedNumber}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          keyboardType="phone-pad"
          maxLength={14} // (123) 456-7890
        />
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
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingHorizontal: 12,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
}); 