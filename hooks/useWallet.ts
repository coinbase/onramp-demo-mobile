import {
  useEmbeddedEthereumWallet,
  useEmbeddedSolanaWallet,
} from "@privy-io/expo";
import { useEffect } from "react";

import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
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

  const { exportWallet } = usePrivy();

  const { exportWallet: exportSolanaWallet } = useSolanaWallets();
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

  const sendEthereumTransaction = async (to: string, amount: number) => {
    // Get address
    // Get an EIP-1193 Provider
    const provider = await ethWallets[0].getProvider();
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    // Send transaction (will be signed and populated)
    const response = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0x0000000000000000000000000000000000000000",
          value: "1",
        },
      ],
    });
  };

  const switchEVMChain = async (chainId: string) => {
    const provider = await ethWallets[0].getProvider();
    try {
      const response = await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
      });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleExportWallet = async () => {
    if (network === "solana") {
      exportSolanaWallet(solWallets?.[0]);
    } else {
      exportWallet(ethWallets[0]);
    }
  };

  const currentWallet = network === "solana" ? solWallets?.[0] : ethWallets[0];

  return {
    currentWallet,
    sendEthereumTransaction,
    switchEVMChain,
    handleExportWallet,
  };
};
