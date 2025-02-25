import { AmountInput } from "@/components/AmountInput/AmountInput";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { FormRow } from "@/components/FormRow/FormRow";
import { Fund } from "@/components/Fund/Fund";
import { ThemedText } from "@/components/ThemedText";
import { ASSET_OPTIONS, CURRENCY_OPTIONS } from "@/constants/constants";
import { StyleSheet, View } from "react-native";

const getCurrencySymbol = (currency: string): string => {
  const symbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
  };
  return symbols[currency] || currency;
};

type FundFormProps = {
  currency: string;
  amount: string;
  asset: string;
  walletAddress: string;
  walletChain: string;
  onChangeCurrency: (value: string) => void;
  onChangeAmount: (value: string) => void;
  onChangeAsset: (value: string) => void;
};

export const FundForm = ({
  currency,
  amount,
  asset,
  walletAddress,
  walletChain,
  onChangeCurrency,
  onChangeAmount,
  onChangeAsset,
}: FundFormProps) => {
  return (
    <View style={styles.container}>
      {/* Payment details card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle}>Payment Details</ThemedText>
        </View>

        <View style={styles.cardContent}>
          <FormRow label="Pay with">
            <Dropdown
              value={currency}
              onValueChange={onChangeCurrency}
              options={CURRENCY_OPTIONS}
              placeholder="Select currency"
            />
          </FormRow>

          <View style={styles.divider} />

          <FormRow label="Receive">
            <Dropdown
              value={asset}
              onValueChange={onChangeAsset}
              options={ASSET_OPTIONS}
              placeholder="Select asset"
            />
          </FormRow>
        </View>
      </View>

      {/* Amount input section */}
      <View style={styles.amountSection}>
        <AmountInput
          value={amount}
          onChangeText={onChangeAmount}
          prefix={getCurrencySymbol(currency)}
          currency={currency}
        />
      </View>

      {/* Fund button */}
      <Fund
        currency={currency}
        amount={amount}
        asset={asset}
        walletAddress={walletAddress}
        walletChain={walletChain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  amountSection: {
    backgroundColor: "#ffffff10",
    borderRadius: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: "#ffffff10",
    borderRadius: 16,
    overflow: "hidden",
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
  divider: {
    height: 1,
    backgroundColor: "#ffffff15",
  },
});
