import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { memo, useCallback, useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet } from "../BottomSheet/BottomSheetProvider";
import { ThemedText } from "../ThemedText";

type DropdownOption<T> = {
  id: string;
  label: string;
  value: T;
  iconUrl?: string;
  icon?: ImageSourcePropType;
  Icon?: React.ComponentType<{
    width: number;
    height: number;
    style: any;
    color?: string;
  }>;
  description?: string;
};

type DropdownProps<T extends DropdownOption<T>> = {
  value: T;
  onValueChange: (value: T) => void;
  options: T[];
  placeholder?: string;
  hint?: string;
  title?: string;
  isSelected: (option: T) => boolean;
};

export const Dropdown = memo(
  <T extends DropdownOption<T>>({
    value,
    onValueChange,
    options,
    placeholder = "Select an option",
    hint,
    title,
    isSelected,
  }: DropdownProps<T>) => {
    const { showBottomSheet, hideBottomSheet } = useBottomSheet();
    const textColor = useThemeColor({}, "text");
    const secondaryColor = useThemeColor({}, "secondary");
    const backgroundColor = useThemeColor({}, "background");
    const foregroundMuted = useThemeColor({}, "foregroundMuted");
    const insets = useSafeAreaInsets();

    const selectedOption = useMemo(
      () => options.find(isSelected),
      [options, value]
    );

    const renderContent = useCallback(
      () => (
        <BottomSheetFlatList
          data={options}
          ListHeaderComponent={() => (
            <ThemedText style={styles.option} font="medium" type="subtitle">
              {title}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onValueChange(item.value);
                hideBottomSheet();
              }}
            >
              <View style={styles.option}>
                <View style={styles.optionContent}>
                  {item.Icon ? (
                    <item.Icon
                      width={32}
                      height={32}
                      style={{ marginRight: 12 }}
                      color={textColor}
                    />
                  ) : (
                    (item.iconUrl || item.icon) && (
                      <Image
                        source={item.icon || { uri: item.iconUrl }}
                        style={[{ width: 32, height: 32, marginRight: 12 }]}
                        resizeMode="contain"
                      />
                    )
                  )}
                  <View style={{ flexDirection: "column" }}>
                    <ThemedText font="medium">{item.label}</ThemedText>
                    {item.description && (
                      <ThemedText style={[{ color: foregroundMuted }]}>
                        {item.description}
                      </ThemedText>
                    )}
                  </View>
                </View>
                {isSelected(item) && (
                  <Ionicons name="checkmark" size={24} color={textColor} />
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => JSON.stringify(item.value)}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
            backgroundColor: backgroundColor,
          }}
        />
      ),
      [
        backgroundColor,
        insets.bottom,
        options,
        textColor,
        title,
        isSelected,
        onValueChange,
        hideBottomSheet,
      ]
    );

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: secondaryColor }]}
          onPress={() => showBottomSheet(renderContent())}
        >
          <View style={styles.buttonContent}>
            {selectedOption?.Icon ? (
              <selectedOption.Icon
                width={24}
                height={24}
                style={styles.icon}
                color={textColor}
              />
            ) : (
              (selectedOption?.iconUrl || selectedOption?.icon) && (
                <Image
                  source={
                    selectedOption.icon || { uri: selectedOption.iconUrl }
                  }
                  style={styles.icon}
                  resizeMode="contain"
                />
              )
            )}
            <ThemedText>{selectedOption?.label || placeholder}</ThemedText>
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color={textColor}
            style={styles.chevron}
          />
        </TouchableOpacity>

        {hint && <ThemedText style={styles.hint}>{hint}</ThemedText>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  button: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  hint: {
    fontSize: 12,
    opacity: 0.5,
    marginLeft: 4,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
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
