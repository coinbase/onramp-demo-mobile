import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

export const LoadingOverlay = () => {
  const backgroundOverlay = useThemeColor({}, "backgroundOverlay");
  const foreground = useThemeColor({}, "foreground");
  const { appLoading, appLoadingMessage } = useApp();

  if (!appLoading) return null;

  return (
    <View style={[styles.container, { backgroundColor: backgroundOverlay }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={foreground} />
        <ThemedText style={styles.message} font="medium">
          {appLoadingMessage}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  content: {
    alignItems: "center",
    gap: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});
