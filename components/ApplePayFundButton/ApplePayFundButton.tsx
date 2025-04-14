import { ONRAMP_OCB_GC_AP_URL } from "@/constants/constants";
import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";
import ApplePayFundButtonLoading from "./ApplePayFundButtonLoading";

export const APPLE_PAY_BUTTON_HEIGHT = 56;
export const APPLE_PAY_BUTTON_RADIUS = 12;

/**
 * We are injecting a custom style to the webview to make the Apple Pay button look like our button.
 */
const injectedJavaScript = `
const style = document.createElement('style');
style.innerHTML = \`.onramp-apple-pay-button {
  background-color: #0052FF !important;
  color: white !important;
  border-radius: ${APPLE_PAY_BUTTON_RADIUS}px !important;
  font-size: 18px !important;
  height: ${APPLE_PAY_BUTTON_HEIGHT}px !important;
}\`;
document.head.appendChild(style);
true;
`;

export default function ApplePayFundButton() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Custom loading indicator that looks like the Apple Pay button from the webview that allows to have seemless transition while loading  */}
      <ApplePayFundButtonLoading isLoading={isLoading} />

      <WebView
        ref={webViewRef}
        style={{
          height: isLoading ? 0 : APPLE_PAY_BUTTON_HEIGHT,
          borderRadius: APPLE_PAY_BUTTON_RADIUS,
        }}
        onLoadEnd={() => {
          /**
           * We are injecting a custom style to the webview to make the Apple Pay button look like our button.
           */
          webViewRef.current?.injectJavaScript(injectedJavaScript);
        }}
        onMessage={({ nativeEvent }) => {
          const { eventName } = JSON.parse(nativeEvent.data);

          switch (eventName) {
            case "onramp_api.load_success":
              setIsLoading(false);
              break;
            case "onramp_api.load_pending":
              break;
            case "onramp_api.commit_error":
              break;
            case "onramp_api.commit_success":
              break;
            default:
              break;
          }
        }}
        source={{ uri: ONRAMP_OCB_GC_AP_URL }}
        startInLoadingState={true}
      />
    </>
  );
}
