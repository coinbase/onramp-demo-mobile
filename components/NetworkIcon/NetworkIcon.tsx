import { Image, StyleSheet } from "react-native";

type NetworkIconProps = {
  chainType?: string;
  size?: number;
};

export const NetworkIcon = ({ chainType, size = 24 }: NetworkIconProps) => {
  const getIconUrl = () => {
    switch (chainType?.toLowerCase()) {
      case "ethereum":
        return "https://cryptologos.cc/logos/ethereum-eth-logo.png";
      case "polygon":
        return "https://cryptologos.cc/logos/polygon-matic-logo.png";
      case "arbitrum":
        return "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg";
      case "optimism":
        return "https://assets.coingecko.com/coins/images/25244/small/Optimism.png";
      default:
        return "https://cryptologos.cc/logos/ethereum-eth-logo.png";
    }
  };

  return (
    <Image
      source={{ uri: getIconUrl() }}
      style={[styles.icon, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    borderRadius: 12,
  },
});
