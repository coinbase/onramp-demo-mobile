import { Image, StyleSheet } from "react-native";

import { Fund } from "@/components/Fund/Fund";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "blue", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/onramp-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Coinbase Onramp Demo
        </ThemedText>

        <Fund />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
  },

  reactLogo: {
    height: 200,
    width: 300,
    bottom: 0,
    left: 0,
    position: "absolute",
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
  },
});
