import { LoadingScreen } from "@/components/LoadingScreen/LoadingScreen";
import { ONRAMP_OCB_GC_AP_URL } from "@/constants/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function ZeroClickBuyScreen() {
  return (
    <>
      <WebView
        style={styles.container}
        source={{ uri: ONRAMP_OCB_GC_AP_URL }}
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <LoadingScreen message="Loading..." />
          </View>
        )}
        startInLoadingState={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
