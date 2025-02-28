import BaseIcon from "@/assets/icons/BaseIcon";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { OnrampNetwork } from "@/constants/types";
import { useApp } from "@/context/AppContext";
import { fetchExchangeRate } from "@/utils/fetchExchangeRate";
import { getNetworkIcon } from "@/utils/getNetworkIcon";
import React, { memo, useCallback } from "react";
import { useAmountInput } from "../FundForm/hooks/useAmountInput";

export const NetworkDropdown = memo(() => {
  const {
    network,
    setNetwork,
    allNetworks,
    asset,
    setAsset,
    purchaseCurrencies,
    setExchangeRate,
    setAppLoading,
    currency,
    fiatAmount,
    cryptoAmount,
    country,
    subdivision,
    setFiatAmount,
    setCryptoAmount,
  } = useApp();

  const getNetworkIconComponent = useCallback((networkName: string) => {
    if (networkName === "base") {
      return BaseIcon;
    }

    return undefined;
  }, []);

  const { handleFiatChange } = useAmountInput({
    setFiatAmount: setFiatAmount,
    setCryptoAmount: setCryptoAmount,
  });

  const handleChangeNetwork = useCallback(
    async (network: OnrampNetwork) => {
      setAppLoading(true);
      setNetwork(network);

      // If currently selected asset is not part of the new network, set the asset to the first asset of the new network
      if (!asset?.networks.some((n) => n.name === network.name)) {
        const networkAssets = purchaseCurrencies.filter((currency) =>
          currency.networks.some((n) => n.name === network?.name)
        );

        if (networkAssets[0]) {
          setAsset(networkAssets[0]);

          const exchangeRate = await fetchExchangeRate({
            asset: asset!,
            currency: currency!,
            country,
            subdivision,
          });

          handleFiatChange(fiatAmount, exchangeRate);

          setExchangeRate(exchangeRate);
        }
      }

      setAppLoading(false);
    },
    [
      setNetwork,
      asset,
      currency,
      fiatAmount,
      cryptoAmount,
      country,
      subdivision,
      setFiatAmount,
      setCryptoAmount,
      handleFiatChange,
    ]
  );

  return (
    <Dropdown
      title="Select network"
      value={network}
      onValueChange={handleChangeNetwork}
      isSelected={(option) => option.value === network}
      options={
        allNetworks?.map((network) => ({
          id: network.chainId,
          name: network.name,
          label: network.displayName,
          value: network,
          iconUrl: getNetworkIcon(network.chainId),
          Icon: getNetworkIconComponent(network.name),
        })) ?? []
      }
    />
  );
});
