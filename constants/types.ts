export type OnrampAmount = {
  value: string;
  currency: string;
};

export type OnrampError = {
  errorType:
    | "internal_error"
    | "handled_error"
    | "network_error"
    | "unknown_error";
  code?: string;
  debugMessage?: string;
};

export type OnrampQuoteResponseData = {
  /**
   * Object with amount and currency of the total fiat payment required to complete the purchase, inclusive of any fees.
   * The currency will match the `paymentCurrency` in the request if it is supported, otherwise it falls back to USD.
   */
  paymentTotal: OnrampAmount;
  /**
   * Object with amount and currency of the fiat cost of the crypto asset to be purchased, exclusive of any fees.
   * The currency will match the `paymentCurrency`.
   */
  paymentSubtotal: OnrampAmount;
  /**
   * Object with amount and currency of the crypto that to be purchased.
   * The currency will match the `purchaseCurrency` in the request.
   * The number of decimals will be based on the crypto asset.
   */
  purchaseAmount: OnrampAmount;
  /**
   * Object with amount and currency of the fee changed by the Coinbase exchange to complete the transaction.
   * The currency will match the `paymentCurrency`.
   */
  coinbaseFee: OnrampAmount;
  /**
   * Object with amount and currency of the network fee required to send the purchased crypto to the user’s wallet.
   * The currency will match the `paymentCurrency`.
   */
  networkFee: OnrampAmount;
  /**
   * Reference to the quote that should be passed into the initialization parameters when launching the Coinbase Onramp widget via the SDK or URL generator.
   */
  quoteId: string;
};

export type OnrampConfigResponseData = {
  countries: OnrampConfigCountry[];
};

export type OnrampConfigCountry = {
  id: string;
  subdivisions: string[];
  paymentMethods: OnrampPaymentMethod[];
};

export type OnrampPaymentMethod = {
  id: string;
  displayName: string;
  description: string;
};

export type OnrampOptionsResponseData = {
  /**
   * List of supported fiat currencies that can be exchanged for crypto on Onramp in the given location.
   * Each currency contains a list of available payment methods, with min and max transaction limits for that currency.
   */
  paymentCurrencies: OnrampPaymentCurrency[];
  /**
   * List of available crypto assets that can be bought on Onramp in the given location.
   */
  purchaseCurrencies: OnrampPurchaseCurrency[];
};

export type OnrampPurchaseCurrency = {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  networks: OnrampNetwork[];
};

export type OnrampPaymentCurrency = {
  id: string;
  iconUrl: string;
  limits: OnrampPaymentMethodLimit[];
};

export type OnrampNetwork = {
  name: string;
  displayName: string;
  chainId: string;
  contractAddress: string;
};

export type OnrampPaymentMethodLimit = {
  id: string;
  min: string;
  max: string;
};
