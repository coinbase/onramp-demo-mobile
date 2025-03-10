import { Balance } from "@/components/Balance/Balance";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WalletDetails } from "@/components/WalletDetails/WalletDetails";
import { OnrampNetwork } from "@/constants/types";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useWallet } from "@/hooks/useWallet";
import { Ionicons } from "@expo/vector-icons";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WalletScreen() {
  const { logout } = usePrivy();
  const insets = useSafeAreaInsets();
  const { allNetworks, network } = useApp();

  const [selectedNetwork, setSelectedNetwork] = useState<OnrampNetwork>(
    network!
  );

  const {
    currentWallet,
    sendEthereumTransaction,
    switchEVMChain,
    handleExportWallet,
  } = useWallet({
    network: selectedNetwork?.name || "base",
  });

  const negativeColor = useThemeColor({}, "negative");
  const foregroundMuted = useThemeColor({}, "foregroundMuted");
  const { setAppLoading, setAppLoadingMessage } = useApp();

  const handleLogout = async () => {
    try {
      setAppLoading(true);
      setAppLoadingMessage("Logging out...");
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAppLoading(false);
    }
  };

  const handleChangeNetwork = useCallback(
    async (network: OnrampNetwork) => {
      setSelectedNetwork(network);
      await switchEVMChain(network.chainId);
    },
    [switchEVMChain]
  );

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.content}>
        <Balance
          network={selectedNetwork}
          onNetworkChange={handleChangeNetwork}
        />

        <WalletDetails
          address={currentWallet?.address}
          network={selectedNetwork}
        />

        <TouchableOpacity onPress={handleExportWallet} style={styles.button}>
          <View style={styles.buttonContent}>
            <Ionicons name="log-out-outline" size={24} color={negativeColor} />
            <ThemedText font="medium" style={[{ color: negativeColor }]}>
              Export Wallet
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <View style={styles.buttonContent}>
            <Ionicons name="log-out-outline" size={24} color={negativeColor} />
            <ThemedText font="medium" style={[{ color: negativeColor }]}>
              Logout
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    gap: 24,
  },
  footer: {
    marginTop: "auto",
    paddingVertical: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
});
