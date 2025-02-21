import { FundForm } from "@/components/FundForm/FundForm";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WalletDetails } from "@/components/WalletDetails/WalletDetails";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useEmbeddedEthereumWallet, usePrivy } from "@privy-io/expo";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("20");
  const [asset, setAsset] = useState("ETH");
  const { user } = usePrivy();
  const { wallets, create } = useEmbeddedEthereumWallet();

  const { balance, isLoading, error } = useWalletBalance();

  useEffect(() => {
    if (wallets.length === 0) {
      create();
    }
  }, [wallets, create]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "blue", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/onramp-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title">Coinbase Onramp Demo</ThemedText>

          <WalletDetails
            chainType={wallets[0]?.chainType}
            address={wallets[0]?.address}
            balance={balance?.toString() || "Not available"}
            isLoading={isLoading}
          />

          <FundForm
            currency={currency}
            amount={amount}
            asset={asset}
            onChangeCurrency={setCurrency}
            onChangeAmount={setAmount}
            onChangeAsset={setAsset}
            walletAddress={wallets[0]?.address}
            walletChain={wallets[0]?.chainType}
          />
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  reactLogo: {
    height: 200,
    width: 300,
    bottom: 0,
    left: 0,
    position: "absolute",
    alignSelf: "center",
  },
});
