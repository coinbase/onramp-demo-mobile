import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";
import ApplePayFundButtonLoading from "./ApplePayFundButtonLoading";
import { APPLE_PAY_BUTTON_HEIGHT, APPLE_PAY_BUTTON_RADIUS } from "./constants";
import {
  ApplePayGuestCheckoutMessage,
} from "./types";
import { useApp } from "@/context/AppContext";

export default function ApplePayFundButton() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { paymentLink } = useApp();
  
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

            switch (eventName) {
              case "onramp_api.load_success":
                setIsLoading(false);
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
