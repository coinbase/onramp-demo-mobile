import { CDP_PROJECT_ID } from "@/constants/constants";
import { getOnrampBuyUrl } from "@coinbase/onchainkit/esm/fund/utils/getOnrampBuyUrl";
import * as WebBrowser from "expo-web-browser";
import React, { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../Button/Button";

type FundProps = {
  currency?: string;
  amount?: string;
  asset?: string;
  walletAddress: string;
  walletChain: string;
};

export const Fund = memo(
  ({
    currency = "USD",
    amount = "0",
    asset = "ETH",
    walletAddress,
    walletChain = "base",
  }: FundProps) => {
    const handlePressFund = useCallback(async () => {
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
          redirectUrl: "onrampdemo://success",
        });

        await WebBrowser.openBrowserAsync(onrampBuyUrl, {
          dismissButtonStyle: "done",
          readerMode: false,
        });
      } catch (error) {
        console.error(error);
      }
    }, [amount, asset, currency, walletAddress, walletChain]);

    return (
      <View style={styles.container}>
        <Button
          title="Fund wallet"
          onPress={handlePressFund}
          variant="primary"
          disabled={Number(amount) === 0}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
    marginTop: 20,
  },
});

export default Fund;
