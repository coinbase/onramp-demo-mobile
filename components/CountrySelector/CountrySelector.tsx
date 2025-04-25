import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
];

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelect,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const lineColor = useThemeColor({}, 'line');
  const textColor = useThemeColor({}, 'text');

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        onSelect(item);
        setIsModalVisible(false);
      }}
    >
      <ThemedText style={styles.flag}>{item.flag}</ThemedText>
      <ThemedText style={styles.countryName}>{item.name}</ThemedText>
      <ThemedText style={styles.dialCode}>{item.dialCode}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.selector, { borderColor: lineColor }]}
        onPress={() => setIsModalVisible(true)}
      >
        <ThemedText style={styles.flag}>{selectedCountry.flag}</ThemedText>
        <ThemedText style={styles.dialCode}>{selectedCountry.dialCode}</ThemedText>
        <Ionicons name="chevron-down" size={16} color={textColor} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <FlatList
              data={COUNTRIES}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              style={styles.list}
            />
          </ThemedView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: '100%',
    borderRightWidth: 1,
    minWidth: 80,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  dialCode: {
    fontSize: 16,
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    borderRadius: 8,
    padding: 16,
  },
  list: {
    width: '100%',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
}); 