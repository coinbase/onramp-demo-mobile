import { useThemeColor } from "@/hooks/useThemeColor";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

type BalanceProps = {
  network?: string;
};

export const Balance = memo(({ network }: BalanceProps) => {
  const foregroundMuted = useThemeColor({}, "foregroundMuted");
  const { balance } = useWalletBalance({
    network: network as "ethereum" | "solana",
  });

  return (
    <View style={styles.container}>
      <ThemedText
        font="medium"
        style={[styles.label, { color: foregroundMuted }]}
      >
        Your balance
      </ThemedText>
      <View style={styles.balanceContainer}>
        <ThemedText style={styles.balance} font="light">
          {balance || "0.00"}
        </ThemedText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
  },
  balanceContainer: {
    marginVertical: 16,
  },
  balance: {
    fontSize: 40,
    lineHeight: 48,
  },
});
