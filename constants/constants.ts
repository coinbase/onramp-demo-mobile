export const DEFAULT_ONRAMP_URL = "https://pay.coinbase.com";

/** The base URL for the Coinbase Onramp widget */
export const ONRAMP_BUY_URL = `${DEFAULT_ONRAMP_URL}/buy`;

export const PRIVY_APP_ID = "cm79e5rbb05qoa6ziniztxby2";

export const PRIVY_CLIENT_ID =
  "client-WY5gyMjRjK9F9RxzrX6GS4qFkWbpYzpLLdCank5KUv8yM";

export const CDP_PROJECT_ID = "6eceb045-266a-4940-9d22-35952496ff00";

export const CURRENCY_OPTIONS = [
  {
    label: "US Dollar (USD)",
    value: "USD",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/usd.png",
  },
  {
    label: "Euro (EUR)",
    value: "EUR",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/eur.png",
  },
  {
    label: "British Pound (GBP)",
    value: "GBP",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/gbp.png",
  },
  {
    label: "Japanese Yen (JPY)",
    value: "JPY",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/jpy.png",
  },
  {
    label: "Canadian Dollar (CAD)",
    value: "CAD",
    iconUrl: "https://wise.com/public-resources/assets/flags/rectangle/cad.png",
  },
];

export const ASSET_OPTIONS = [
  {
    label: "Ethereum (ETH)",
    value: "ETH",
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    label: "USD Coin (USDC)",
    value: "USDC",
    iconUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    label: "Bitcoin (BTC)",
    value: "BTC",
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    label: "Polygon (MATIC)",
    value: "MATIC",
    iconUrl: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  {
    label: "Solana (SOL)",
    value: "SOL",
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
];

// TODO: Get network options using onramp utils from the Onchainkit, once onchainkit is available in react native
export const NETWORK_OPTIONS = [
  {
    label: "Base",
    value: "base",
    iconUrl: null,
    icon: require("@/assets/images/base-icon.jpeg"),
  },
  {
    label: "Ethereum",
    value: "ethereum",
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    label: "Optimism",
    value: "optimism",
    iconUrl: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
  },
  {
    label: "Solana",
    value: "solana",
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
];
