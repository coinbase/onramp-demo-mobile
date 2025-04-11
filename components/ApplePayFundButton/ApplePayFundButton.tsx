import { LoadingScreen } from "@/components/LoadingScreen/LoadingScreen";
import { ONRAMP_OCB_GC_AP_URL } from "@/constants/constants";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const WEBVIEW_HEIGHT = 56;

/**
 * We are injecting a custom style to the webview to make the Apple Pay button look like our button.
 */
const injectedJavaScript = `
const style = document.createElement('style');
style.innerHTML = \`.onramp-apple-pay-button {
  background-color: #0052FF !important;
  color: white !important;
  border-radius: 12px !important;
  font-size: 18px !important;
  height: ${WEBVIEW_HEIGHT}px !important;
}\`;
document.head.appendChild(style);
true;
`;

export default function ApplePayFundButton() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <LoadingScreen />
        </View>
      )}

      <WebView
        ref={webViewRef}
        // Webview should be the same height as the button.
        style={{ height: WEBVIEW_HEIGHT }}
        onLoadEnd={() => {
          /**
           * We are injecting a custom style to the webview to make the Apple Pay button look like our button.
           */
          webViewRef.current?.injectJavaScript(injectedJavaScript);

          /**
           * In webview we could use renderLoading={() => <LoadingScreen />},
           * however the loading component is unmounted and then the webview content starts rendering.
           * This result in a flash (empty screen is rendered between loading unmount and webview content render)
           *
           * To avoid this, we are adding a small delay to allow webview content to render before we unmount the loading component.
           */
          setTimeout(() => setIsLoading(false), 500);
        }}
        source={{ uri: ONRAMP_OCB_GC_AP_URL }}
        startInLoadingState={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
