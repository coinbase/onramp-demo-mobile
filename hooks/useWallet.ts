import {
  useEmbeddedEthereumWallet,
  useEmbeddedSolanaWallet,
} from "@privy-io/expo";
import { useEffect } from "react";

/**
 * Hook to create a wallet if it doesn't exist
 * @param network - The network to create the wallet on
 * @returns The current wallet
 */
export const useWallet = ({ network }: { network: string }) => {
  const { wallets: ethWallets, create: createEthWallet } =
    useEmbeddedEthereumWallet();
  const { wallets: solWallets, create: createSolWallet } =
    useEmbeddedSolanaWallet();

  useEffect(() => {
    if (network === "solana") {
      if (!solWallets || solWallets.length === 0) {
        createSolWallet?.();
      }
    } else {
      if (ethWallets.length === 0) {
        createEthWallet();
      }
    }
  }, [ethWallets, createEthWallet, solWallets, createSolWallet, network]);

  const currentWallet = network === "solana" ? solWallets?.[0] : ethWallets[0];

  return currentWallet;
};
