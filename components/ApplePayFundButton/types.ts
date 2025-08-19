export type CreateOrderResponse = {
  order: Order;
  authSteps: AuthStep[];
  paymentLink: PaymentLink | null;
  accessToken?: AccessToken;
  refreshToken?: RefreshToken;
};

export type TokenBalanceResponse = {
  result: any;
};

export type AuthStep = {
  authType: AuthType;
  authStatus: AuthStatus;
  requiredCustomerData: any[];
  authUrl: string;
};

export type Order = {
  orderId: string;
  paymentTotal: string;
  paymentSubtotal: string;
  paymentCurrency: string;
  paymentMethod: PaymentMethod;
  purchaseAmount: string;
  purchaseCurrency: string;
  fees: any[];
  exchangeRate: string;
  destinationAddress: string;
  destinationNetwork: string;
  status: OrderStatus;
  txHash: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type PaymentLink = {
  url: string;
  paymentLinkType: PaymentLinkType;
};

export type AccessToken = {
  token: string;
  expiresAt: string; // ISO 8601 date string
};

export type RefreshToken = {
  token: string;
  expiresAt: string; // ISO 8601 date string
};

export type AuthType =
  | "AUTH_TYPE_UNSPECIFIED"
  | "AUTH_TYPE_SMS_OTP"
  | "AUTH_TYPE_EMAIL_OTP"
  | "AUTH_TYPE_EDP";

export type AuthStatus =
  | "AUTH_STATUS_PENDING"
  | "AUTH_STATUS_CODE_SENT"
  | "AUTH_STATUS_COMPLETE";

export type OrderStatus =
  | "ONRAMP_TRANSACTION_STATUS_CREATED"
  | "ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"
  | "ONRAMP_TRANSACTION_STATUS_SUCCESS"
  | "ONRAMP_TRANSACTION_STATUS_FAILED"
  | "ONRAMP_TRANSACTION_STATUS_AWAITING_AUTH"
  | "ONRAMP_TRANSACTION_STATUS_AWAITING_PAYMENT";

export type PaymentMethod =
  | "UNSPECIFIED"
  | "CARD"
  | "ACH_BANK_ACCOUNT"
  | "APPLE_PAY"
  | "FIAT_WALLET"
  | "CRYPTO_ACCOUNT"
  | "GUEST_CHECKOUT_CARD"
  | "PAYPAL"
  | "RTP"
  | "GUEST_CHECKOUT_APPLE_PAY";

export type PaymentLinkType = "PAYMENT_LINK_TYPE_APPLE_PAY_BUTTON";

export type ApplePayGuestCheckoutEventName =
  | "onramp_api.load_success"
  | "onramp_api.load_pending"
  | "onramp_api.commit_error"
  | "onramp_api.commit_success"
  | "onramp_api.cancel";

export type ApplePayGuestCheckoutMessage = {
  eventName: ApplePayGuestCheckoutEventName;
  data: {
    orderId: string;
  };
};
