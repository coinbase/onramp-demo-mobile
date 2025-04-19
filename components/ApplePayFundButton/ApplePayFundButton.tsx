import { ONRAMP_OCB_GC_AP_URL } from "@/constants/constants";
import { useApiClient } from "@/services/apiClient";
import React, { useEffect, useRef, useState } from "react";
import { WebView } from "react-native-webview";
import ApplePayFundButtonLoading from "./ApplePayFundButtonLoading";
import { APPLE_PAY_BUTTON_HEIGHT, APPLE_PAY_BUTTON_RADIUS } from "./constants";
import {
  ApplePayGuestCheckoutMessage,
  AuthType,
  CreateOrderResponse,
} from "./types";

/**
 * We are injecting a custom style to the webview to make the Apple Pay button look like our button.
 */
const injectedJavaScript = `
(function() {
  try {
    const style = document.createElement('style');
    style.textContent = \`.onramp-apple-pay-button {
      background-color: #0052FF;
      color: white;
      border-radius: ${APPLE_PAY_BUTTON_RADIUS}px;
      font-size: 18px;
      height: ${APPLE_PAY_BUTTON_HEIGHT}px;
    }\`;
    document.head.appendChild(style);
  } catch (e) {
    console.error('Failed to inject styles:', e);
  }
})();
true;
`;

export default function ApplePayFundButton() {
  const apiClient = useApiClient();

  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applePayUrl, setApplePayUrl] = useState("1");

  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = async () => {
    try {
      const response = await apiClient.request<CreateOrderResponse>(
        "/onramp/create-order",
        {
          method: "POST",
        }
      );

      if (response.authSteps.length > 0) {
        setApplePayUrl(response.authSteps[0].authUrl);
      }

      if (response.paymentLink) {
        setApplePayUrl(response.paymentLink.url);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const authorizeOrder = async (
    orderId: string,
    authType: AuthType,
    oneTimePassword: string
  ) => {
    try {
      const response = await apiClient.request<CreateOrderResponse>(
        `/onramp/authorize-order/${orderId}`,
        {
          method: "POST",
          body: JSON.stringify({
            authType,
            oneTimePassword,
          }),
        }
      );
    } catch (error) {
      console.error("Error authorizing order:", error);
    }
  };

  return (
    <>
      {/* Custom loading indicator that looks like the Apple Pay button from the webview that allows to have seemless transition while loading  */}
      <ApplePayFundButtonLoading isLoading={isLoading} />

      {applePayUrl && (
        <WebView
          ref={webViewRef}
          style={{
            height: isLoading ? 0 : APPLE_PAY_BUTTON_HEIGHT,
            borderRadius: APPLE_PAY_BUTTON_RADIUS,
          }}
          onLoadEnd={() => {
            webViewRef.current?.injectJavaScript(injectedJavaScript);
          }}
          onMessage={({ nativeEvent }) => {
            const { eventName } = JSON.parse(
              nativeEvent.data
            ) as ApplePayGuestCheckoutMessage;

            switch (eventName) {
              case "onramp_api.load_success":
                setIsLoading(false);
                break;
              default:
                break;
            }
          }}
          source={{ uri: ONRAMP_OCB_GC_AP_URL }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={false}
          sharedCookiesEnabled={false}
        />
      )}
    </>
  );
}
