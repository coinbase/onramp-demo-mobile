import { OnrampNetwork } from "@/constants/types";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import React, { memo, useCallback, useState } from "react";
import { Animated, Image, StyleSheet, View, Clipboard, Pressable } from "react-native";
import { RowSpaceBetween } from "../blocks/RowSpaceBetween";
import { Dropdown } from "../Dropdown/Dropdown";
import { ThemedText } from "../ThemedText";

type BalanceProps = {
  network?: OnrampNetwork;
  onNetworkChange: (network: OnrampNetwork) => void;
  address?: string;
};

export const Balance = memo(({ network, onNetworkChange, address }: BalanceProps) => {
  const foregroundMuted = useThemeColor({}, "foregroundMuted");
  const [showCopied, setShowCopied] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const { allNetworks } = useApp();

  const { balance } = useWalletBalance({
    network: network?.name as "ethereum" | "solana",
  });

  const iconRenderer = useCallback(
    (option: OnrampNetwork, width = 32, height = 32) => {
      if (!option) {
        return null;
      }
      return (
        <Image
          source={{ uri: option.iconUrl }}
          style={{ width, height, marginRight: 8 }}
          resizeMode="contain"
        />
      );
    },
    []
  );

  const searchFunction = useCallback(
    (query: string, options: OnrampNetwork[]) => {
      return options.filter(
        (option) =>
          option.displayName.toLowerCase().includes(query.toLowerCase()) ||
          option.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    []
  );

  const isSelected = useCallback(
    (option: OnrampNetwork) => {
      return option.name === network?.name;
    },
    [network]
  );

  const keySelector = useCallback((option: OnrampNetwork) => option?.name, []);

  const labelSelector = useCallback(
    (option: OnrampNetwork) => option?.displayName,
    []
  );

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
      <RowSpaceBetween>
        <ThemedText
          font="medium"
          style={[styles.label, { color: foregroundMuted }]}
        >
          Your balance
        </ThemedText>
        <Dropdown
          title="Select network"
          value={network}
          onValueChange={onNetworkChange}
          isSelected={isSelected}
          disabled={allNetworks.length === 1}
          options={allNetworks}
          searchFunction={searchFunction}
          keySelector={keySelector}
          labelSelector={labelSelector}
          iconRenderer={iconRenderer}
          snapPoints={["85%"]}
        />
      </RowSpaceBetween>
      <View style={styles.balanceContainer}>
        <ThemedText style={styles.balance} font="light">
          {balance || "0.00"}
        </ThemedText>
      </View>

      <View style={styles.walletAddressContainer}>
          <ThemedText
            font="regular"
            style={{ color: foregroundMuted, paddingBottom: 8 }}
          >
            {`${network?.displayName} wallet address`}
          </ThemedText>
          <Pressable onPress={handleCopyAddress}>
            <ThemedText numberOfLines={3}>
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  walletAddressContainer: {
    flexDirection: "column",
    height: 100,
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
