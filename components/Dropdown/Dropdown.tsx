import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";

type DropdownOption = {
  label: string;
  value: string;
  iconUrl?: string;
};

type DropdownProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  hint?: string;
};

export const Dropdown = ({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  hint,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const selectedOption = options.find((option) => option.value === value);

  const renderOption = (option: DropdownOption) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        onValueChange(option.value);
        setIsOpen(false);
      }}
    >
      <View style={styles.optionContent}>
        {option.iconUrl && (
          <Image
            source={{ uri: option.iconUrl }}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        <ThemedText
          style={[
            styles.optionText,
            option.value === value && styles.selectedOption,
          ]}
        >
          {option.label}
        </ThemedText>
      </View>
      {option.value === value && (
        <Ionicons name="checkmark" size={20} color={textColor} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { borderColor: "#E6E8EB" }]}
        onPress={() => setIsOpen(true)}
      >
        <View style={styles.buttonContent}>
          {selectedOption?.iconUrl && (
            <Image
              source={{ uri: selectedOption.iconUrl }}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          <ThemedText style={styles.buttonText}>
            {selectedOption?.label || placeholder}
          </ThemedText>
        </View>
        <Ionicons
          name="chevron-down"
          size={20}
          color={textColor}
          style={styles.chevron}
        />
      </TouchableOpacity>

      {hint && <ThemedText style={styles.hint}>{hint}</ThemedText>}

      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => renderOption(item)}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  button: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12,
  },
  hint: {
    fontSize: 12,
    opacity: 0.5,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    maxHeight: "80%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff15",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    fontWeight: "600",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
});
