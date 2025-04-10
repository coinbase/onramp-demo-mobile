import { OnrampPaymentMethod } from "./types";

export const DEFAULT_ONRAMP_URL = "https://pay.coinbase.com";

/** The base URL for the Coinbase Onramp widget */
export const ONRAMP_BUY_URL = `${DEFAULT_ONRAMP_URL}/buy`;

export const ONRAMP_OCB_GC_AP_URL =
  "https://localhost:3000/v2/onramp/card-details?addresses=%7B%220x438BbEF3525eF1b0359160FD78AF9c1158485d87%22%3A%5B%22base%22%5D%7D&appId=36b7972f-b87f-4c13-a313-1b00db0212ec&assets=%5B%22ETH%22%5D&fiatCurrency=USD&presetFiatAmount=10";

export const PRIVY_APP_ID = "cm79e5rbb05qoa6ziniztxby2";

export const PRIVY_CLIENT_ID =
  "client-WY5gyMjRjK9F9RxzrX6GS4qFkWbpYzpLLdCank5KUv8yM";

export const CDP_PROJECT_ID = "6eceb045-266a-4940-9d22-35952496ff00";

export const CDP_CLIENT_API_KEY = "VmvIBxCiyNgDQ78njUIAql86kEokLMQ1";

export const PAYMENT_METHOD_OPTIONS: OnrampPaymentMethod[] = [
  {
    id: "COINBASE",
    displayName: "Coinbase",
    description: "ACH, debit, cash, crypto balance.",
  },
  {
    id: "APPLE_PAY",
    displayName: "Apple Pay",
    description: "Up to $500/week. No sign up required.",
  },
  {
    id: "APPLE_PAY_GUEST",
    displayName: "Apple Pay Guest",
    description: "Up to $500/week. No sign up required.",
  },
  {
    id: "CARD",
    displayName: "Debit card",
    description: "Up to $500/week. No sign up required.",
  },
];
