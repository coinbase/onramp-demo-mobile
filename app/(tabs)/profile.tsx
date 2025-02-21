import Button from "@/components/Button/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = usePrivy();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        },
      ]}
    >
      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText style={styles.cardTitle}>Profile</ThemedText>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>User ID</ThemedText>
              <ThemedText style={styles.value} numberOfLines={1}>
                {user?.id || "Not available"}
              </ThemedText>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <ThemedText style={styles.value}>{"Not available"}</ThemedText>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Auth Method</ThemedText>
              <ThemedText style={styles.value}>
                {user?.linked_accounts[0]?.type || "Not available"}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          icon={
            <Ionicons
              name="log-out-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
          }
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ffffff10",
    borderRadius: 16,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff15",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#ffffff15",
  },
  footer: {},
  icon: {
    marginRight: 8,
  },
});
