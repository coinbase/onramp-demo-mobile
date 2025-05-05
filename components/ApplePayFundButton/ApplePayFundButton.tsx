import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";
import ApplePayFundButtonLoading from "./ApplePayFundButtonLoading";
import { APPLE_PAY_BUTTON_HEIGHT, APPLE_PAY_BUTTON_RADIUS } from "./constants";
import {
  ApplePayGuestCheckoutMessage,
} from "./types";
import { useApp } from "@/context/AppContext";

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
