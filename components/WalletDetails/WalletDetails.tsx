import { NetworkDropdown } from "@/components/NetworkDropdown/NetworkDropdown";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { memo, useState } from "react";
import { Animated, Clipboard, Pressable, StyleSheet, View } from "react-native";
import { RowSpaceBetween } from "../blocks/RowSpaceBetween";

type WalletDetailsProps = {
  address?: string;
};

export const WalletDetails = memo(({ address }: WalletDetailsProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const foregroundMuted = useThemeColor({}, "foregroundMuted");

  const handleCopyAddress = async () => {
    if (address) {
      await Clipboard.setString(address);
      setShowCopied(true);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setShowCopied(false));
    }
  };

  return (
    <>
      <RowSpaceBetween containerStyle={{ marginBottom: 16 }}>
        <ThemedText font="medium" type="subtitle">
          Wallet details
        </ThemedText>
        <NetworkDropdown />
      </RowSpaceBetween>

      <View style={styles.walletAddressContainer}>
        <ThemedText
          font="medium"
          style={{ color: foregroundMuted, paddingBottom: 8 }}
        >
          wallet address
        </ThemedText>
        <Pressable onPress={handleCopyAddress}>
          <ThemedText numberOfLines={1}>
            {address || "Not connected"}
          </ThemedText>
          {showCopied && (
            <Animated.View style={[styles.copiedBadge, { opacity: fadeAnim }]}>
              <ThemedText style={styles.copiedText}>Copied!</ThemedText>
            </Animated.View>
          )}
        </Pressable>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  walletAddressContainer: {
    flexDirection: "column",
    height: 100,
  },
  copiedBadge: {
    position: "absolute",
    top: -24,
    right: 0,
    backgroundColor: "#00000099",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  copiedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
});
