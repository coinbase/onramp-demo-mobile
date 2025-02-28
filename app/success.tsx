import Button from "@/components/Button/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SuccessScreen() {
  const insets = useSafeAreaInsets();
  const primaryColor = useThemeColor({}, "primary");

  useEffect(() => {
    // You can handle any success params from the URL here if needed
    // const { searchParams } = new URL(window.location.href);
  }, []);

  const handleContinue = () => {
    router.replace("/home");
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 24,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.icon}>
          <Ionicons name="checkmark-circle" size={64} color={primaryColor} />
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={styles.title} font="medium">
            Purchase Successful!
          </ThemedText>
          <ThemedText style={styles.description}>
            Your crypto purchase has been completed successfully. The funds will
            be available in your wallet shortly.
          </ThemedText>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Continue" onPress={handleContinue} variant="primary" />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  icon: {
    marginBottom: 16,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
  footer: {
    paddingVertical: 16,
  },
});
