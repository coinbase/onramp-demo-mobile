import { Balance } from "@/components/Balance/Balance";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WalletDetails } from "@/components/WalletDetails/WalletDetails";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useWallet } from "@/hooks/useWallet";
import { Ionicons } from "@expo/vector-icons";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WalletScreen() {
  const { user, logout } = usePrivy();
  const insets = useSafeAreaInsets();
  const { network, setNetwork } = useApp();
  const currentWallet = useWallet({ network: network?.name || "base" });
  const negativeColor = useThemeColor({}, "negative");
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
        <Balance network={network?.name || "base"} />

        <WalletDetails address={currentWallet?.address} />
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
