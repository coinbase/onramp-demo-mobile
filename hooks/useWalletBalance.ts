import {
  SolanaClient,
  useEmbeddedEthereumWallet,
  useEmbeddedSolanaWallet,
} from "@privy-io/expo";
import { useCallback, useEffect, useState } from "react";

export const useWalletBalance = ({
  network,
}: {
  network: "ethereum" | "solana";
}) => {
  const [balance, setBalance] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { wallets: ethWallets } = useEmbeddedEthereumWallet();
  const { wallets: solWallets } = useEmbeddedSolanaWallet();

  const fetchBalance = useCallback(async () => {
    if (network === "ethereum" && ethWallets.length === 0) return;
    if (network === "solana" && solWallets?.length === 0) return;

    setIsLoading(true);
    setError(undefined);

    try {
      if (network === "solana") {
        const wallet = solWallets?.[0];

        const solanaClient = new SolanaClient({
          name: "mainnet-beta",
          rpcUrl: "https://api.mainnet-beta.solana.com",
        });

        const balance = await solanaClient.getBalance(wallet?.address || "");

        const balanceInSol = Number(balance) / 1e9;

        setBalance(balanceInSol.toFixed(8) + " SOL");
      } else {
        const wallet = ethWallets[0];
        const provider = await wallet?.getProvider();
        const balanceInWei = await provider?.request({
          method: "eth_getBalance",
          params: [wallet.address, "latest"],
        });
        const balanceInEth = parseInt(balanceInWei || "0", 16) / 1e18;
        setBalance(balanceInEth.toFixed(8) + " ETH");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch balance")
      );
    } finally {
      setIsLoading(false);
    }
  }, [ethWallets, solWallets, network]);

  // Fetch on mount and when wallet changes
  useEffect(() => {
    console.log("fetching balance");
    fetchBalance();
  }, [fetchBalance, network]);

  // Poll balance every 10 seconds
  useEffect(() => {
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [fetchBalance]);

  return {
    balance,
    isLoading,
    error,
    refetch: fetchBalance,
  };
};
