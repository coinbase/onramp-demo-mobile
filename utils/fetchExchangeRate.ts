import {
  OnrampPaymentCurrency,
  OnrampPurchaseCurrency,
} from "@/constants/types";
import { fetchOnrampQuote } from "./fetchOnrampQuote";

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
