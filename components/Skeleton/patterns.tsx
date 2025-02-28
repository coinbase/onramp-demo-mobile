import { StyleSheet, View } from "react-native";
import { Skeleton } from "./Skeleton";

export const ListItemSkeleton = () => (
  <View style={styles.listItem}>
    <Skeleton circle height={40} width={40} />
    <View style={styles.listItemContent}>
      <Skeleton width={120} height={16} style={styles.mb8} />
      <Skeleton width={200} height={12} />
    </View>
  </View>
);

export const RowSpaceBetweenSkeleton = () => (
  <View style={styles.row}>
    <Skeleton width={48} height={20} />
    <Skeleton width={100} height={40} />
  </View>
);

export const AvatarWithTextSkeleton = () => (
  <View style={styles.avatarWithText}>
    <Skeleton circle height={64} width={64} style={styles.mb8} />
    <Skeleton width={100} height={16} style={styles.mb4} />
    <Skeleton width={80} height={12} />
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  listItemContent: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  avatarWithText: {
    alignItems: "center",
    padding: 16,
  },
  mb4: {
    marginBottom: 4,
  },
  mb8: {
    marginBottom: 8,
  },
  mb16: {
    marginBottom: 16,
  },
});
