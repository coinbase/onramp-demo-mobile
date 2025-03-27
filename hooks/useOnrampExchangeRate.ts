import { CDP_CLIENT_API_KEY } from "@/constants/constants";
import type {
  OnrampError,
  OnrampPaymentCurrency,
  OnrampPurchaseCurrency,
} from "@/constants/types";
import { fetchOnrampQuote } from "@coinbase/onchainkit/esm/fund/utils/fetchOnrampQuote";
import { useCallback, useMemo } from "react";

export const useOnrampExchangeRate = ({
  asset,
  currency,
  country,
  subdivision,
  setExchangeRate,
  onError,
  setExchangeRateLoading,
}: {
  asset: OnrampPurchaseCurrency | undefined;
  currency: OnrampPaymentCurrency | undefined;
  country: string;
  subdivision?: string;
  setExchangeRate: (exchangeRate: number) => void;
  onError?: (error: OnrampError) => void;
  setExchangeRateLoading: (exchangeRateLoading: boolean) => void;
}) => {
  const fetchExchangeRate = useCallback(async () => {
    if (!asset || !currency) {
      return;
    }

    try {
      setExchangeRateLoading(true);
      const quote = await fetchOnrampQuote({
        apiKey: CDP_CLIENT_API_KEY,
        purchaseCurrency: asset.id,
        paymentCurrency: currency.id,
        paymentAmount:
          currency.limits.find((limit) => limit.id === "CARD")?.min || "10000",
        paymentMethod: "CARD",
        country,
        subdivision,
      });

      setExchangeRate(
        Number(quote.purchaseAmount.value) / Number(quote.paymentSubtotal.value)
      );
      setExchangeRateLoading(false);
    } catch (err) {
      setExchangeRateLoading(false);
      if (err instanceof Error) {
        console.error("Error fetching exchange rate:", err);
        onError?.({
          errorType: "handled_error",
          code: "EXCHANGE_RATE_ERROR",
          debugMessage: err.message,
        });
      } else {
        console.error("Unknown error fetching exchange rate:", err);
        onError?.({
          errorType: "unknown_error",
          code: "EXCHANGE_RATE_ERROR",
          debugMessage: JSON.stringify(err),
        });
      }
    }
  }, [asset, country, subdivision, currency, onError, setExchangeRate]);

  return useMemo(() => ({ fetchExchangeRate }), [fetchExchangeRate]);
};
