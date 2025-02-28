import { FundForm } from "@/components/FundForm/FundForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CURRENCY_OPTIONS } from "@/constants/constants";
import { useApp } from "@/context/AppContext";
import { useWallet } from "@/hooks/useWallet";
import { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { currency, network } = useApp();

  const insets = useSafeAreaInsets();
  const currentWallet = useWallet({ network: network?.name || "base" });

  const currencySymbol = useMemo(
    () =>
      CURRENCY_OPTIONS.find((option) => option.value === currency?.id)?.symbol,
    [currency]
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, paddingTop: insets.top }}
      >
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Coinbase Onramp demo
        </ThemedText>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent]}
        >
          <FundForm walletAddress={currentWallet?.address || ""} />
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
});
