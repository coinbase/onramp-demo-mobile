import { useEmbeddedEthereumWallet } from "@privy-io/expo";

export const useEtheriumWallet = () => {
  const { wallets: privyEthWallets, create: privyCreateEthWallet } =
    useEmbeddedEthereumWallet();

  return { wallets: privyEthWallets, create: privyCreateEthWallet };
};
