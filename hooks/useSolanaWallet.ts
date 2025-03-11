import { useEmbeddedSolanaWallet } from "@privy-io/expo";

export const useSolanaWallet = () => {
  const { wallets: privySolWallets, create: privyCreateSolWallet } =
    useEmbeddedSolanaWallet();

  return { wallets: privySolWallets, create: privyCreateSolWallet };
};
