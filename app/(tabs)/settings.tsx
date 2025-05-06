import { useCallback, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApp } from "@/context/AppContext";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { network, userPhoneNumber, setUserPhoneNumber } = useApp();
  const [ shouldResetPhoneNumber, setShouldResetPhoneNumber ] = useState(false);

  const insets = useSafeAreaInsets();

  const handleTogglePhoneNumber = useCallback(() => {
    setShouldResetPhoneNumber(!shouldResetPhoneNumber);
  }, [shouldResetPhoneNumber]);

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
          <View style={styles.settingRow}>
            <ThemedText>Remove Phone Number</ThemedText>
            <Switch
              value={!shouldResetPhoneNumber}
              onValueChange={handleTogglePhoneNumber}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
