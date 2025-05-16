import { OnrampNetwork } from "@/constants/types";
import { useApp } from "@/context/AppContext";
import { useWallet } from "@/hooks/useWallet";
import { useApiClient } from "@/services/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { WebView } from "react-native-webview";
import ApplePayFundButtonLoading from "./ApplePayFundButtonLoading";
import { APPLE_PAY_BUTTON_HEIGHT, APPLE_PAY_BUTTON_RADIUS } from "./constants";
import { ApplePayGuestCheckoutMessage, CreateOrderResponse } from "./types";

export default function ApplePayFundButton() {
  const apiClient = useApiClient();
  const {
    fiatAmount,
    setOrderId,
    setPaymentLink,
    paymentLink,
    currency,
    asset,
    userPhoneNumber,
    userEmail,
    network,
  } = useApp();

  const [selectedNetwork, setSelectedNetwork] = useState<OnrampNetwork>(
    network!
  );

  const { currentWallet, switchEVMChain } = useWallet({
    network: selectedNetwork?.name || "base",
  });

  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make a request to create an order when the component is mounted.
    if (!paymentLink) {
      createOrder();
    }
  }, [fiatAmount, userPhoneNumber, userEmail, paymentLink]);

  const createOrder = async () => {
    setIsLoading(true);
    if (!userPhoneNumber || !userEmail) {
      router.push("/user-info");
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const isSandboxMode = await AsyncStorage.getItem("isSandboxMode");

      const partnerUserRef =
        isSandboxMode === "true" ? "sandbox-123" : "some-partner-user-ref";

      const response = await apiClient.request<CreateOrderResponse>(
        "/onramp/create-order",
        {
          method: "POST",
          body: JSON.stringify({
            accessToken: accessToken,
            paymentAmount: fiatAmount,
            paymentCurrency: currency?.id,
            purchaseCurrency: asset?.id,
            paymentMethod: "GUEST_CHECKOUT_APPLE_PAY",
            destinationAddress: currentWallet?.address,
            destinationNetwork: selectedNetwork?.name,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            partnerUserRef: partnerUserRef,
            agreementAcceptedAt: "2025-04-24T00:00:00Z",
          }),
        }
      );

      console.log("response", response);

      if (response.paymentLink) {
        setPaymentLink(response.paymentLink.url);
      }

      if (response.order?.orderId) {
        setOrderId(response.order?.orderId);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Custom loading indicator that looks like the Apple Pay button from the webview that allows to have seemless transition while loading  */}
      <ApplePayFundButtonLoading isLoading={isLoading} />

      {paymentLink && (
        <WebView
          ref={webViewRef}
          style={{
            height: isLoading ? 0 : APPLE_PAY_BUTTON_HEIGHT,
            borderRadius: APPLE_PAY_BUTTON_RADIUS,
          }}
          onMessage={({ nativeEvent }) => {
            const { eventName } = JSON.parse(
              nativeEvent.data
            ) as ApplePayGuestCheckoutMessage;

            console.log("eventName", eventName);
            switch (eventName) {
              case "onramp_api.load_success":
                setIsLoading(false);
                break;
              case "onramp_api.commit_error":
              case "onramp_api.cancel":
                // Empty payment link so that the new transaction is created
                setPaymentLink(null);
                setIsLoading(false);
                break;
              case "onramp_api.commit_success":
                // Wait for 2 seconds to allow apple pay to show the success icon
                setTimeout(() => {
                  setPaymentLink(null);
                  setIsLoading(false);
                }, 2000);
                break;
              default:
                break;
            }
          }}
          source={{ uri: paymentLink }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={false}
          sharedCookiesEnabled={false}
        />
      )}
    </>
  );
}
