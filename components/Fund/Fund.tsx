import { CDP_PROJECT_ID } from "@/constants/constants";
import { getOnrampBuyUrl } from "@/utils/getOnrampUrl";
import { MaterialIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../Button/Button";

type FundProps = {
  currency?: string;
  amount?: string;
  asset?: string;
  walletAddress: string;
  walletChain: string;
};

export const Fund = ({
  currency = "USD",
  amount = "0",
  asset = "ETH",
  walletAddress,
  walletChain = "base",
}: FundProps) => {
  const handlePressFund = async () => {
    try {
      /**
       * This is the main integration point for the Coinbase Onramp
       *
       * 1. Get the Onramp URL
       * 2. Open the browser with the Onramp URL
       */
      const onrampBuyUrl = getOnrampBuyUrl({
        projectId: CDP_PROJECT_ID,
        addresses: {
          [walletAddress]: [walletChain],
        },
        assets: [asset],
        presetFiatAmount: Number(amount),
        fiatCurrency: currency,
        redirectUrl: "onrampdemo://",
      });

      await WebBrowser.openBrowserAsync(onrampBuyUrl, {
        dismissButtonStyle: "done",
        readerMode: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Fund with Coinbase"
        onPress={handlePressFund}
        variant="primary"
        icon={
          <MaterialIcons
            name="currency-exchange"
            size={24}
            color="white"
            style={styles.icon}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default Fund;
