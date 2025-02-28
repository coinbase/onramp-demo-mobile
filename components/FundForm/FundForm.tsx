import { Divider } from "@/components/blocks/Divider";
import { RowSpaceBetween } from "@/components/blocks/RowSpaceBetween";
import { Card } from "@/components/Card/Card";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Fund } from "@/components/Fund/Fund";
import { AmountInput } from "@/components/FundForm/components/AmountInput";
import { NetworkDropdown } from "@/components/NetworkDropdown/NetworkDropdown";
import { ThemedText } from "@/components/ThemedText";
import { PAYMENT_METHOD_OPTIONS } from "@/constants/constants";
import {
  OnrampPaymentCurrency,
  OnrampPurchaseCurrency,
} from "@/constants/types";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { fetchExchangeRate } from "@/utils/fetchExchangeRate";
import { getCurrencyIcon } from "@/utils/getCurrencyIcon";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getPaymentMethodIcon } from "@/utils/getPaymentMethodIcon";
import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAmountInput } from "./hooks/useAmountInput";

type FundFormProps = {
  walletAddress: string;
};

export const FundForm = memo(({ walletAddress }: FundFormProps) => {
  const {
    currency,
    fiatAmount,
    cryptoAmount,
    asset,
    network,
    paymentMethod,
    setCurrency,
    setFiatAmount,
    setCryptoAmount,
    setAsset,
    setNetwork,
    setPaymentMethod,
    exchangeRate,
    setExchangeRate,
    country,
    subdivision,
    paymentCurrencies,
    purchaseCurrencies,
    dataLoading,
    setAppLoading,
  } = useApp();

  const foregroundMuted = useThemeColor({}, "foregroundMuted");

  const { handleFiatChange, handleCryptoChange } = useAmountInput({
    setFiatAmount,
    setCryptoAmount,
  });

  const handleChangeAsset = useCallback(
    async (asset: OnrampPurchaseCurrency) => {
      setAppLoading(true);
      setAsset(asset);

      const exchangeRate = await fetchExchangeRate({
        asset: asset!,
        currency: currency!,
        country,
        subdivision,
      });

      handleFiatChange(fiatAmount, exchangeRate);

      setNetwork(asset.networks[0]);

      setExchangeRate(exchangeRate);

      setAppLoading(false);
    },
    [currency, country, subdivision, fiatAmount, asset]
  );

  const handleChangeCurrency = useCallback(
    async (currency: OnrampPaymentCurrency) => {
      setAppLoading(true);
      setCurrency(currency);

      // Fetch the exchange rate
      const exchangeRate = await fetchExchangeRate({
        asset: asset!,
        currency,
        country,
        subdivision,
      });

      handleCryptoChange(cryptoAmount, exchangeRate);

      setExchangeRate(exchangeRate);

      setAppLoading(false);
    },
    [currency, country, subdivision, cryptoAmount, asset]
  );

  const assetList = useMemo(() => {
    return purchaseCurrencies
      .filter((currency) =>
        currency.networks.some((n) => n.name === network?.name)
      )
      .map((currency) => ({
        id: currency.id,
        label: currency.symbol,
        value: currency,
        iconUrl: currency.iconUrl,
      }));
  }, [purchaseCurrencies, network]);

  return (
    <View style={styles.container}>
      <Card bordered={true}>
        <ThemedText style={{ color: foregroundMuted }}>Buy</ThemedText>

        <RowSpaceBetween>
          <AmountInput
            value={fiatAmount}
            onChangeText={(value) => handleFiatChange(value, exchangeRate)}
            prefix={getCurrencySymbol(currency?.id || "")}
            isLoading={dataLoading}
          />

          <Dropdown<any>
            title="Select currency"
            value={currency}
            onValueChange={handleChangeCurrency}
            isSelected={(option) => option.id === currency?.id}
            options={paymentCurrencies.map((currency) => ({
              id: currency.id,
              label: currency.id,
              value: currency,
              iconUrl: getCurrencyIcon(currency.id, 32),
            }))}
          />
        </RowSpaceBetween>

        <Divider />

        <ThemedText style={{ color: foregroundMuted }}>Receive</ThemedText>

        <RowSpaceBetween>
          <AmountInput
            value={cryptoAmount}
            onChangeText={(value) => handleCryptoChange(value, exchangeRate)}
            isLoading={dataLoading}
          />

          <Dropdown<any>
            title="Select asset"
            value={asset}
            onValueChange={handleChangeAsset}
            isSelected={(option) => option.id === asset?.id}
            options={assetList}
          />
        </RowSpaceBetween>

        <Divider />

        <RowSpaceBetween>
          <ThemedText style={{ color: foregroundMuted }}>Network</ThemedText>

          <NetworkDropdown />
        </RowSpaceBetween>
      </Card>

      <Card bordered={true}>
        <RowSpaceBetween>
          <ThemedText style={{ color: foregroundMuted }}>Pay with</ThemedText>

          <Dropdown<any>
            title="Pay with"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            isSelected={(option) => option.id === paymentMethod?.id}
            options={PAYMENT_METHOD_OPTIONS.map((option) => ({
              id: option.id,
              label: option.displayName,
              value: option,
              Icon: getPaymentMethodIcon(option.id),
            }))}
          />
        </RowSpaceBetween>
      </Card>

      <Fund
        currency={currency?.id}
        amount={fiatAmount}
        asset={asset?.symbol}
        walletAddress={walletAddress}
        walletChain={network?.name || "base"}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
