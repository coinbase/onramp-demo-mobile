import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function ZeroClickBuyScreen() {
  const insets = useSafeAreaInsets();
  const placeholderUrl = "https://example.com"; // Replace with your actual URL

  return (
    <WebView
      style={[styles.container, { paddingTop: insets.top }]}
      source={{ uri: placeholderUrl }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
