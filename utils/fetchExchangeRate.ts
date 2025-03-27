import { CDP_CLIENT_API_KEY } from "@/constants/constants";
import {
  OnrampPaymentCurrency,
  OnrampPurchaseCurrency,
} from "@/constants/types";

import { fetchOnrampQuote } from "@coinbase/onchainkit/esm/fund/utils/fetchOnrampQuote";

export const fetchExchangeRate = async ({
  asset,
  currency,
  country,
  subdivision,
}: {
  asset: OnrampPurchaseCurrency;
  currency: OnrampPaymentCurrency;
  country: string;
  subdivision: string;
}) => {
  try {
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

    return Number(
      (
        Number(quote.purchaseAmount.value) / Number(quote.paymentSubtotal.value)
      ).toFixed(8)
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error fetching exchange rate:", err);
    } else {
      console.error("Unknown error fetching exchange rate:", err);
    }

    return 0;
  }
};
