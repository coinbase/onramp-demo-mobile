import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";

type LoadingScreenProps = {
  message?: string;
};

export const LoadingScreen = ({
  message = "Loading...",
}: LoadingScreenProps) => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.loadingContainer}>
          {[...Array(3)].map((_, i) => (
            <MotiView
              key={i}
              style={[styles.dot]}
              from={{ opacity: 0.5, scale: 1 }}
              animate={{
                opacity: 0.8,
                scale: 1.2,
              }}
              transition={{
                type: "timing",
                duration: 1000,
                delay: i * 200,
                loop: true,
              }}
            />
          ))}
        </View>
        <ThemedText style={styles.loadingText}>{message}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
  },
  content: {
    alignItems: "center",
    gap: 24,
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.7,
  },
});
