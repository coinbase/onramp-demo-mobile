import { OnrampNetwork } from "@/constants/types";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import React, { memo, useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";
import { RowSpaceBetween } from "../blocks/RowSpaceBetween";
import { Dropdown } from "../Dropdown/Dropdown";
import { ThemedText } from "../ThemedText";

type BalanceProps = {
  network?: OnrampNetwork;
  onNetworkChange: (network: OnrampNetwork) => void;
};

export const Balance = memo(({ network, onNetworkChange }: BalanceProps) => {
  const foregroundMuted = useThemeColor({}, "foregroundMuted");

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
