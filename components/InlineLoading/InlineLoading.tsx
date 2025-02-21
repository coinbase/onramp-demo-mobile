import { useThemeColor } from "@/hooks/useThemeColor";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";

export const InlineLoading = () => {
  const dotColor = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      {[...Array(3)].map((_, i) => (
        <MotiView
          key={i}
          style={[styles.dot, { backgroundColor: dotColor }]}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 0.7 }}
          transition={{
            type: "timing",
            duration: 600,
            delay: i * 150,
            loop: true,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
