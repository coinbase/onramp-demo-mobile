import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, { memo, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet } from "../BottomSheet/BottomSheetProvider";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

type DropdownProps = {
  value: any;
  onValueChange: (option: any) => void;
  options: Array<any>;
  placeholder?: string;
  hint?: string;
  title?: string;
  isSelected: (option: any) => boolean;
  searchFunction?: (query: string, options: Array<any>) => Array<any>;
  disabled?: boolean;
  labelSelector?: (option: any) => string;
  descriptionSelector?: (option: any) => string;
  iconRenderer?: (
    option: any,
    width?: number,
    height?: number
  ) => React.ReactNode;
  keySelector?: (option: any) => string;
  enableDynamicSizing?: boolean;
  snapPoints?: string[];
};

export const Dropdown = memo(
  ({
    value,
    onValueChange,
    options,
    placeholder = "Select an option",
    hint,
    title,
    isSelected,
    searchFunction,
    disabled = false,
    labelSelector,
    descriptionSelector,
    iconRenderer,
    keySelector,
    enableDynamicSizing = false,
    snapPoints,
  }: DropdownProps) => {
    const { showBottomSheet, hideBottomSheet } = useBottomSheet();
    const textColor = useThemeColor({}, "text");
    const secondaryColor = useThemeColor({}, "secondary");

    const selectedOption = useMemo(
      () => options.find(isSelected),
      [options, isSelected]
    );

    return (
      <View style={outerStyles.container}>
        <TouchableOpacity
          style={[
            outerStyles.button,
            { backgroundColor: secondaryColor },
            disabled && { opacity: 0.5 },
          ]}
          onPress={() =>
            !disabled &&
            showBottomSheet(
              <DropdownContent
                title={title || "Select an option"}
                options={options}
                onValueChange={onValueChange as (value: unknown) => void}
                isSelected={isSelected as (option: any) => boolean}
                searchFunction={searchFunction}
                keySelector={keySelector}
                labelSelector={labelSelector}
                descriptionSelector={descriptionSelector}
                iconRenderer={iconRenderer}
              />,
              snapPoints,
              enableDynamicSizing
            )
          }
          disabled={disabled}
        >
          <View style={outerStyles.buttonContent}>
            {iconRenderer?.(selectedOption, 24, 24)}

            <ThemedText>
              {labelSelector?.(selectedOption) || placeholder}
            </ThemedText>
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color={textColor}
            style={outerStyles.chevron}
          />
        </TouchableOpacity>

        {hint && <ThemedText style={outerStyles.hint}>{hint}</ThemedText>}
      </View>
    );
  }
);

type DropdownContentProps<T> = {
  title: string;
  options: Array<T>;
  onValueChange: (option: T) => void;
  isSelected: (option: T) => boolean;
  labelSelector?: (option: T) => string;
  descriptionSelector?: (option: T) => string;
  iconRenderer?: (option: T) => React.ReactNode;
  keySelector?: (option: T) => string;
  searchFunction?: (query: string, options: Array<T>) => Array<T>;
};

const DropdownContent = memo(
  <T,>({
    title,
    options,
    onValueChange,
    isSelected,
    labelSelector,
    descriptionSelector,
    iconRenderer,
    keySelector,
    searchFunction,
  }: DropdownContentProps<T>) => {
    const insets = useSafeAreaInsets();
    const { hideBottomSheet } = useBottomSheet();
    const textColor = useThemeColor({}, "text");
    const foregroundMuted = useThemeColor({}, "foregroundMuted");
    const backgroundColor = useThemeColor({}, "background");
    const backgroundAlternate = useThemeColor({}, "backgroundAlternate");
    const borderColor = useThemeColor({}, "line");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOptions = useMemo(() => {
      if (!searchQuery.trim()) {
        return options;
      }
      return searchFunction?.(searchQuery, options) || options;
    }, [options, searchQuery]);

    return (
      <View style={contentStyles.container}>
        <ThemedView style={contentStyles.headerContainer}>
          <ThemedText
            style={contentStyles.headerTitle}
            font="medium"
            type="subtitle"
          >
            {title}
          </ThemedText>
          {searchFunction && (
            <View
              style={[
                contentStyles.searchContainer,
                {
                  borderColor: borderColor,
                  backgroundColor: backgroundAlternate,
                },
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                color={foregroundMuted}
                style={contentStyles.searchIcon}
              />
              <BottomSheetTextInput
                style={[contentStyles.searchInput, { color: textColor }]}
                placeholder="Search..."
                placeholderTextColor={foregroundMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery?.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={foregroundMuted}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </ThemedView>

        <View style={contentStyles.listContainer}>
          <BottomSheetFlatList
            data={filteredOptions}
            keyboardShouldPersistTaps="always"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onValueChange(item);
                  hideBottomSheet();
                }}
              >
                <View style={contentStyles.option}>
                  <View style={contentStyles.optionContent}>
                    {iconRenderer?.(item)}

                    <View style={{ flexDirection: "column" }}>
                      <ThemedText font="medium">
                        {labelSelector?.(item)}
                      </ThemedText>
                      {descriptionSelector && (
                        <ThemedText style={[{ color: foregroundMuted }]}>
                          {descriptionSelector?.(item)}
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
            keyExtractor={keySelector}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              backgroundColor: backgroundColor,
            }}
          />
        </View>
      </View>
    );
  }
);

const outerStyles = StyleSheet.create({
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
  chevron: {
    marginLeft: 8,
  },
});

const contentStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerTitle: {
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 8,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
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
});
