import { useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TwoFactorForm } from "@/components/TwoFactorForm/TwofactorForm";
import { useApp } from "@/context/AppContext";
import { router } from "expo-router";

export default function TwoFactorScreen() {
  const insets = useSafeAreaInsets();
  const { setPaymentMethod } = useApp();

  const handleOnCodeSubmit = useCallback((code: string) => {
    setPaymentMethod({
      id: "APPLE_PAY_GUEST",
      displayName: "Apple Pay",
      description: "Apple Pay",
    });
    console.log("handleOnCodeSubmit", code);
    router.replace("/home");
  }, [setPaymentMethod]);

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, paddingTop: insets.top }}
      >
        <ThemedText type="subtitle" style={{ textAlign: "center", height: 56 }}>
          Coinbase Onramp demo
        </ThemedText>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{padding: 32, alignContent: "center"}}
        >
          <TwoFactorForm onCodeSubmit={handleOnCodeSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    height: "100%",
  },
  scrollContent: {
    gap: 24,
    padding: 16,
    },
});