import ApplePayIcon from "@/assets/icons/ApplePayIcon";
import CardIcon from "@/assets/icons/CardIcon";
import CoinbaseIcon from "@/assets/icons/CoinbaseIcon";

export const getPaymentMethodIcon = (paymentMethod: string) => {
  switch (paymentMethod) {
    case "COINBASE":
      return CoinbaseIcon;
    case "APPLE_PAY":
      return ApplePayIcon;
    case "CARD":
      return CardIcon;
  }
};
