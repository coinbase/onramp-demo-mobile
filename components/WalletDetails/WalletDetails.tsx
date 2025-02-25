import { ThemedText } from "@/components/ThemedText";
import { NETWORK_OPTIONS } from "@/constants/constants";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useState } from "react";
import { Animated, Clipboard, Pressable, StyleSheet, View } from "react-native";
import { Dropdown } from "../Dropdown/Dropdown";
import { FormRow } from "../FormRow/FormRow";

type WalletDetailsProps = {
  network?: string;
  address?: string;
  onChangeNetwork?: (network: string) => void;
};

export const WalletDetails = ({
  network,
  address,
  onChangeNetwork,
}: WalletDetailsProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const { balance, isLoading, error } = useWalletBalance({
    network: network as "ethereum" | "solana",
  });

  const handleCopyAddress = async () => {
    if (address) {
      await Clipboard.setString(address);
      setShowCopied(true);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setShowCopied(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle}>Wallet Details</ThemedText>
        </View>

        <View style={styles.cardContent}>
          <FormRow label="Network">
            <Dropdown
              value={network || "base"}
              onValueChange={onChangeNetwork || (() => {})}
              options={NETWORK_OPTIONS}
              placeholder="Select network"
            />
          </FormRow>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Address</ThemedText>
            <Pressable
              onPress={handleCopyAddress}
              style={styles.addressContainer}
            >
              <ThemedText style={styles.value} numberOfLines={1}>
                {address || "Not connected"}
              </ThemedText>
              {showCopied && (
                <Animated.View
                  style={[styles.copiedBadge, { opacity: fadeAnim }]}
                >
                  <ThemedText style={styles.copiedText}>Copied!</ThemedText>
                </Animated.View>
              )}
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Balance</ThemedText>
            <ThemedText style={styles.value}>{balance}</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ffffff10",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff15",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    opacity: 0.7,
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#ffffff15",
  },
  addressContainer: {
    flex: 2,
    position: "relative",
    alignItems: "flex-end",
  },
  copiedBadge: {
    position: "absolute",
    top: -24,
    right: 0,
    backgroundColor: "#00000099",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  copiedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  valueWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 2,
    justifyContent: "flex-end",
  },
});
