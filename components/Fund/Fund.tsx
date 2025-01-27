import { getOnrampBuyUrl } from "@/utils/getOnrampUrl";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Input } from "../Input/Input";
import { ThemedText } from "../ThemedText";

type FundProps = {
  title?: string;
};

export const Fund = ({ title = "Fund" }: FundProps) => {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("20");
  const [asset, setAsset] = useState("ETH");

  const handlePress = async () => {
    try {
      const onrampBuyUrl = getOnrampBuyUrl({
        // projectId from the CDP portal Dashboard
        projectId: "6eceb045-266a-4940-9d22-35952496ff00",
        // addresses to fund
        addresses: {
          "0x438BbEF3525eF1b0359160FD78AF9c1158485d87": ["base"],
        },
        // assets to fund
        assets: [asset],
        // preset fiat amount to fund
        presetFiatAmount: Number(amount),
        // fiat currency
        fiatCurrency: currency,
        // redirect url after the payment is complete
        redirectUrl: "https://yourapp.com/onramp-return?param=foo",
      });

      await WebBrowser.openBrowserAsync(onrampBuyUrl, {
        dismissButtonStyle: "cancel",
        readerMode: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Input
            label="Currency"
            placeholder="Enter currency"
            keyboardType="default"
            value={currency}
            onChangeText={setCurrency}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Amount"
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Asset"
            placeholder="Enter asset"
            keyboardType="default"
            value={asset}
            onChangeText={setAsset}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.buttonText}>{title}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  inputWrapper: {
    flex: 1, // This makes each input take exactly half the space
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Fund;
