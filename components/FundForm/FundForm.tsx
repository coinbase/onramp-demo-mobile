import { Divider } from "@/components/blocks/Divider";
import { RowSpaceBetween } from "@/components/blocks/RowSpaceBetween";
import { Card } from "@/components/Card/Card";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Fund } from "@/components/Fund/Fund";
import { AmountInput } from "@/components/FundForm/components/AmountInput";
import { ThemedText } from "@/components/ThemedText";
import { PAYMENT_METHOD_OPTIONS } from "@/constants/constants";
import {
  OnrampNetwork,
  OnrampPaymentCurrency,
  OnrampPaymentMethod,
  OnrampPurchaseCurrency,
} from "@/constants/types";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { fetchExchangeRate } from "@/utils/fetchExchangeRate";
import { getCurrencyIcon } from "@/utils/getCurrencyIcon";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getPaymentMethodIcon } from "@/utils/getPaymentMethodIcon";
import { memo, useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";
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
    allNetworks,
  } = useApp();

  const foregroundMuted = useThemeColor({}, "foregroundMuted");
  const textColor = useThemeColor({}, "text");

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

      if (Number(fiatAmount) > 0) {
        handleFiatChange(fiatAmount, exchangeRate);
      }

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

      if (Number(cryptoAmount) > 0) {
        handleCryptoChange(cryptoAmount, exchangeRate);
      }

      setExchangeRate(exchangeRate);

      setAppLoading(false);
    },
    [currency, country, subdivision, cryptoAmount, asset]
  );

  const isCurrencySelected = useCallback(
    (option: OnrampPaymentCurrency) => {
      return option.id === currency?.id;
    },
    [currency]
  );

  const keySelector = useCallback(
    (option: OnrampPaymentCurrency) => option.id,
    []
  );

  const currencyLabelSelector = useCallback(
    (option: OnrampPaymentCurrency) => option.id,
    []
  );

  const currencyIconRenderer = useCallback(
    (option: OnrampPaymentCurrency, width = 32, height = 32) => {
      return (
        <Image
          source={{ uri: getCurrencyIcon(option.id, width) }}
          style={{ width, height, marginRight: 8 }}
          resizeMode="contain"
        />
      );
    },
    []
  );

  const currencySearchFunction = useCallback(
    (query: string, options: OnrampPaymentCurrency[]) => {
      return options.filter((option) =>
        option.id.toLowerCase().includes(query.toLowerCase())
      );
    },
    []
  );

  const assetLabelSelector = useCallback(
    (option: OnrampPurchaseCurrency) => option.symbol,
    []
  );

  const assetDescriptionSelector = useCallback(
    (option: OnrampPurchaseCurrency) => option.name,
    []
  );

  const assetIconRenderer = useCallback(
    (option: OnrampPurchaseCurrency, width = 32, height = 32) => {
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

  const assetSearchFunction = useCallback(
    (query: string, options: OnrampPurchaseCurrency[]) => {
      return options.filter(
        (option) =>
          option.name.toLowerCase().includes(query.toLowerCase()) ||
          option.symbol.toLowerCase().includes(query.toLowerCase())
      );
    },
    []
  );

  const isAssetSelected = useCallback(
    (option: OnrampPurchaseCurrency) => {
      return option.id === asset?.id;
    },
    [asset]
  );

  const isNetworkSelected = useCallback(
    (option: OnrampNetwork) => {
      return option.name === network?.name;
    },
    [network]
  );

  const networkSearchFunction = useCallback(
    (query: string, options: OnrampNetwork[]) => {
      return options.filter(
        (option) =>
          option.displayName.toLowerCase().includes(query.toLowerCase()) ||
          option.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    []
  );

  const networkKeySelector = useCallback(
    (option: OnrampNetwork) => option.name,
    []
  );

  const networkLabelSelector = useCallback(
    (option: OnrampNetwork) => option.displayName,
    []
  );

  const networkIconRenderer = useCallback(
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

  const isPaymentMethodSelected = useCallback(
    (option: OnrampPaymentMethod) => {
      return option.id === paymentMethod?.id;
    },
    [paymentMethod]
  );

  const paymentMethodKeySelector = useCallback(
    (option: OnrampPaymentMethod) => option.id,
    []
  );

  const paymentMethodLabelSelector = useCallback(
    (option: OnrampPaymentMethod) => option.displayName,
    []
  );

  const paymentMethodIconRenderer = useCallback(
    (option: OnrampPaymentMethod, width = 32, height = 32) => {
      if (!option) {
        return null;
      }
      const Icon = getPaymentMethodIcon(option.id);
      if (!Icon) {
        return null;
      }

      return (
        <Icon
          width={width}
          height={height}
          style={{ marginRight: 8 }}
          color={textColor}
        />
      );
    },
    []
  );

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

          <Dropdown
            title="Select currency"
            value={currency}
            onValueChange={handleChangeCurrency}
            isSelected={isCurrencySelected}
            keySelector={keySelector}
            labelSelector={currencyLabelSelector}
            iconRenderer={currencyIconRenderer}
            options={paymentCurrencies}
            searchFunction={currencySearchFunction}
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

          <Dropdown
            title="Select asset"
            value={asset}
            onValueChange={handleChangeAsset}
            isSelected={isAssetSelected}
            keySelector={keySelector}
            labelSelector={assetLabelSelector}
            descriptionSelector={assetDescriptionSelector}
            iconRenderer={assetIconRenderer}
            options={purchaseCurrencies}
            searchFunction={assetSearchFunction}
          />
        </RowSpaceBetween>

        <Divider />

        <RowSpaceBetween>
          <ThemedText style={{ color: foregroundMuted }}>Network</ThemedText>

          <Dropdown
            title="Select network"
            value={network}
            onValueChange={setNetwork}
            isSelected={isNetworkSelected}
            disabled={asset?.networks.length === 1}
            options={asset?.networks || []}
            searchFunction={networkSearchFunction}
            keySelector={networkKeySelector}
            labelSelector={networkLabelSelector}
            iconRenderer={networkIconRenderer}
          />
        </RowSpaceBetween>
      </Card>

      <Card bordered={true}>
        <RowSpaceBetween>
          <ThemedText style={{ color: foregroundMuted }}>Pay with</ThemedText>

          <Dropdown
            title="Pay with"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            isSelected={isPaymentMethodSelected}
            labelSelector={paymentMethodLabelSelector}
            keySelector={paymentMethodKeySelector}
            iconRenderer={paymentMethodIconRenderer}
            options={PAYMENT_METHOD_OPTIONS}
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
