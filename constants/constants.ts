import BaseIcon from "@/assets/icons/BaseIcon";
import { OnrampPaymentMethod } from "./types";

export const DEFAULT_ONRAMP_URL = "https://pay.coinbase.com";

/** The base URL for the Coinbase Onramp widget */
export const ONRAMP_BUY_URL = `${DEFAULT_ONRAMP_URL}/buy`;

export const ONRAMP_API_BASE_URL =
  "https://api.developer.coinbase.com/onramp/v1";

export const PRIVY_APP_ID = "cm79e5rbb05qoa6ziniztxby2";

export const PRIVY_CLIENT_ID =
  "client-WY5gyMjRjK9F9RxzrX6GS4qFkWbpYzpLLdCank5KUv8yM";

export const CDP_PROJECT_ID = "6eceb045-266a-4940-9d22-35952496ff00";

export const CDP_CLIENT_ID = "VmvIBxCiyNgDQ78njUIAql86kEokLMQ1";

export const CURRENCY_OPTIONS = [
  {
    label: "USD",
    value: "USD",
    description: "US Dollar",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/usd.png",
    symbol: "$",
  },
  {
    label: "EUR",
    value: "EUR",
    description: "Euro",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/eur.png",
    symbol: "€",
  },
  {
    label: "GBP",
    value: "GBP",
    description: "British Pound",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/gbp.png",
    symbol: "£",
  },
  {
    label: "JPY",
    value: "JPY",
    description: "Japanese Yen",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/jpy.png",
    symbol: "¥",
  },
  {
    label: "CAD",
    value: "CAD",
    description: "Canadian Dollar",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/cad.png",
    symbol: "C$",
  },
];

export const ASSET_OPTIONS = [
  {
    label: "ETH",
    value: "ETH",
    description: "ETH",
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    label: "USDC",
    value: "USDC",
    description: "USDC",
    iconUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    label: "BTC",
    value: "BTC",
    description: "BTC",
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    label: "MATIC",
    value: "MATIC",
    description: "MATIC",
    iconUrl: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  {
    label: "SOL",
    value: "SOL",
    description: "SOL",
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
];

// TODO: Get network options using onramp utils from the Onchainkit, once onchainkit is available in react native
export const NETWORK_OPTIONS = [
  {
    label: "Base",
    value: "base",
    description: "Base",
    iconUrl: undefined,
    Icon: BaseIcon,
  },
  {
    label: "Ethereum",
    value: "ethereum",
    description: "Ethereum",
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    label: "Optimism",
    value: "optimism",
    description: "Optimism",
    iconUrl: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
  },
  {
    label: "Solana",
    value: "solana",
    description: "Solana",
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
];

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
    id: "CARD",
    displayName: "Debit card",
    description: "Up to $500/week. No sign up required.",
  },
];
