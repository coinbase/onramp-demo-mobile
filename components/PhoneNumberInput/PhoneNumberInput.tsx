import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CountrySelector } from '../CountrySelector/CountrySelector';
import { Ionicons } from '@expo/vector-icons';

interface PhoneNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  label?: string;
  onClear?: () => void;
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
  onClear
}) => {
  const [formattedNumber, setFormattedNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const lineColor = useThemeColor({}, 'line');
  const errorColor = useThemeColor({}, 'negative');
  const placeholderColor = useThemeColor({}, 'foregroundMuted');

  useEffect(() => {
    const formatPhoneNumber = (text: string) => {
      const cleaned = text.replace(/\D/g, '');
      
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
      onChangeText(cleaned);
    };

    formatPhoneNumber(value);
  }, [value, onChangeText]);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
  };

  const handleClear = useCallback(() => {
    onClear('');
  }, [onClear]);

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
        {formattedNumber.length > 0 && (
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
  clearButton: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
  },
}); 