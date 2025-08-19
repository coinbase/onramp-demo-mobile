import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Dropdown } from '../Dropdown/Dropdown';

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

  const iconRenderer = useCallback(
    (option: Country) => {
      if (!option) {
        return null;
      }
      return (
        <ThemedText style={styles.flag}>{option.flag}</ThemedText>
      );
    },
    []
  );


  const isSelected = useCallback(
    (option: Country) => {
      return option.code === selectedCountry.code;
    },
    [selectedCountry]
  );

  const keySelector = useCallback((option: Country) => option?.code, []);

  const labelSelector = useCallback(
    (option: Country) => {
      if (selectedCountry.code === option.code) {
        return option.dialCode
      }
      return `${option.dialCode}   ${option.name}`
    },
    [selectedCountry]
  );

  const searchFunction = useCallback(
    (query: string, options: Country[]) => {
      return options.filter(
        (option) =>
          option.name.toLowerCase().includes(query.toLowerCase()) ||
          option.code.toLowerCase().includes(query.toLowerCase())
      );
    },
    []
  );

  return (
    <>
      <Dropdown
        title="Select network"
        value={selectedCountry}
        onValueChange={onSelect}
        isSelected={isSelected}
        options={COUNTRIES}
        searchFunction={searchFunction}
        keySelector={keySelector}
        labelSelector={labelSelector}
        iconRenderer={iconRenderer}
        snapPoints={["85%"]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  dialCode: {
    fontSize: 16,
    marginRight: 4,
  },
}); 