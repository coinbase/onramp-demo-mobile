import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  label?: string;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  value,
  onChangeText,
  error,
  label,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const lineColor = useThemeColor({}, 'line');
  const errorColor = useThemeColor({}, 'negative');
  const primaryColor = useThemeColor({}, 'primary');

  const handleChangeText = (text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/\D/g, '');
    
    // Create new value by replacing the digit at the current index
    const newValue = value.padEnd(6, '');
    const updatedValue = newValue.substring(0, index) + digit + newValue.substring(index + 1);
    
    onChangeText(updatedValue);

    // Move to next input if a digit was entered and not the last one
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      // Create new value by replacing the digit at the current index with '0'
      const newValue = value.padEnd(6, '');
      const updatedValue = newValue.substring(0, index) + '0' + newValue.substring(index + 1);
      
      onChangeText(updatedValue);

      // Move to previous input if not at the first one
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {label && (
          <ThemedText style={styles.label}>{label}</ThemedText>
        )}
        <View style={styles.inputsContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ThemedView
              key={index}
              style={[
                styles.inputWrapper,
                {
                  borderColor: error
                    ? errorColor
                    : focusedIndex === index
                    ? primaryColor
                    : lineColor,
                },
              ]}
            >
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.input}
                value={value[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleFocus(index)}
                autoFocus={index === 0}
                onBlur={handleBlur}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            </ThemedView>
          ))}
        </View>
        {error && (
          <ThemedText style={[styles.error, { color: errorColor }]}>
            {error}
          </ThemedText>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
}); 