import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  const insets = useSafeAreaInsets();
  const foregroundMuted = useThemeColor({}, "foregroundMuted");
  const handleToggleSandboxMode = useCallback(() => {
    setIsSandboxMode(!isSandboxMode);
    AsyncStorage.setItem("isSandboxMode", (!isSandboxMode).toString());
  }, [isSandboxMode]);

  useEffect(() => {
    const getIsSandboxMode = async () => {
      const isSandboxMode = await AsyncStorage.getItem("isSandboxMode");
      if (isSandboxMode) {
        setIsSandboxMode(isSandboxMode === "true");
      }
    };
    getIsSandboxMode();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, paddingTop: insets.top }}
      >
        <ThemedText type="subtitle" style={{ textAlign: "center", height: 56 }}>
          Settings
        </ThemedText>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent]}
        >
          <TouchableOpacity
            onPress={() => router.push("/user-info")}
            style={styles.settingRow}
          >
            <ThemedText>User Info</ThemedText>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={foregroundMuted}
            />
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <ThemedText>Apple Pay Guest Checkout Sandbox Mode</ThemedText>

            <Switch
              value={isSandboxMode}
              onValueChange={handleToggleSandboxMode}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 24,
    padding: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
});
