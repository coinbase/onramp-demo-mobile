import { truncateDecimalPlaces } from "@/utils/truncateDecimalPlaces";
import { useCallback, useMemo } from "react";

type UseAmountInputParams = {
  setFiatAmount: (value: string) => void;
  setCryptoAmount: (value: string) => void;
};

export const useAmountInput = ({
  setFiatAmount,
  setCryptoAmount,
}: UseAmountInputParams) => {
  const handleFiatChange = useCallback(
    (value: string, exchangeRate: number) => {
      const fiatValue = truncateDecimalPlaces(value, 2);
      setFiatAmount(fiatValue);

      const calculatedCryptoValue = (
        Number(fiatValue) * Number(exchangeRate)
      ).toFixed(8);

      const resultCryptoValue = truncateDecimalPlaces(calculatedCryptoValue, 8);
      setCryptoAmount(calculatedCryptoValue === "0" ? "" : resultCryptoValue);
    },
    [setFiatAmount, setCryptoAmount]
  );

  const handleCryptoChange = useCallback(
    (value: string, exchangeRate: number) => {
      const truncatedValue = truncateDecimalPlaces(value, 8);
      setCryptoAmount(truncatedValue);

      const calculatedFiatValue = (
        Number(truncatedValue) / Number(exchangeRate)
      ).toFixed(2);

      const resultFiatValue = truncateDecimalPlaces(calculatedFiatValue, 2);
      setFiatAmount(resultFiatValue === "0" ? "" : resultFiatValue);
    },
    [setFiatAmount, setCryptoAmount]
  );

  return useMemo(
    () => ({
      handleFiatChange,
      handleCryptoChange,
    }),
    [handleFiatChange, handleCryptoChange]
  );
};
