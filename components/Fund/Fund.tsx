import { CDP_PROJECT_ID } from "@/constants/constants";
import { OnrampPaymentMethod } from "@/constants/types";
import { getOnrampBuyUrl } from "@coinbase/onchainkit/esm/fund/utils/getOnrampBuyUrl";
import * as WebBrowser from "expo-web-browser";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import ApplePayFundButton from "../ApplePayFundButton/ApplePayFundButton";
import Button from "../Button/Button";
import { useApiClient } from "@/services/apiClient";
import { generateSessionToken } from "@/utils/generateSessionToken";

type FundProps = {
  currency?: string;
  amount?: string;
  asset?: string;
  walletAddress: string;
  walletChain: string;
  paymentMethod: OnrampPaymentMethod;
};

export const Fund = memo(
  ({
    currency = "USD",
    amount = "0",
    asset = "ETH",
    walletAddress,
    walletChain = "base",
    paymentMethod,
  }: FundProps) => {
    const [isGeneratingSessionToken, setIsGeneratingSessionToken] = useState(false);

    const apiClient = useApiClient();

    const fetchSessionToken = async () => {
      try {          
        setIsGeneratingSessionToken(true);
        const response = await generateSessionToken({
          walletAddress,
          walletChain,
          asset,
          apiClient,
        });

        return response.token;
      } catch (error) {
        console.error("Error generating session token:", error);
      } finally {
        setIsGeneratingSessionToken(false);
      }
    };

    const handlePressFund = useCallback(async () => {
      try {
        const sessionToken = await fetchSessionToken();

          /**
         * This is the main integration point for the Coinbase Onramp
         *
         * 1. Get the Onramp URL
         * 2. Open the browser with the Onramp URL
         */
          const onrampBuyUrl = getOnrampBuyUrl({
            presetFiatAmount: Number(amount),
            fiatCurrency: currency,
            redirectUrl: "onrampdemo://success",
            partnerUserId: "sandbox-user-id",   
            sessionToken: sessionToken || '',
            originAppName: "Coinbase Onramp Demo",
          });

        if (paymentMethod?.id === "COINBASE_APP2APP") {
          console.log("CDP_PROJECT_ID", CDP_PROJECT_ID);
          await Linking.openURL(
            `https://www.coinbase.com/onramp?appId=${CDP_PROJECT_ID}&presetFiatAmount=${amount}&defaultNetwork=${walletChain}&redirectUrl=onrampdemo://success&originAppName=Coinbase Onramp Demo&sessionToken=${sessionToken}`
          );
          return;
        }

        await WebBrowser.openBrowserAsync(onrampBuyUrl, {
          dismissButtonStyle: "done",
          readerMode: false,
        });
      } catch (error) {
        console.error(error);
      }
    }, [amount, asset, currency, walletAddress, walletChain, paymentMethod]);

    return (
      <View style={styles.container}>
        {paymentMethod?.id === "APPLE_PAY_GUEST" ? (
          <ApplePayFundButton />
        ) : (
          <Button
            title="Fund wallet"
            onPress={handlePressFund}
            variant="primary"
            disabled={Number(amount) === 0 || isGeneratingSessionToken}
          />
        )}
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
