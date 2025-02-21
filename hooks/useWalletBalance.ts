import { useEmbeddedEthereumWallet } from "@privy-io/expo";
import { useCallback, useEffect, useState } from "react";

export const useWalletBalance = () => {
  const [balance, setBalance] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { wallets } = useEmbeddedEthereumWallet();

  const fetchBalance = useCallback(async () => {
    if (wallets.length === 0) return;

    setIsLoading(true);
    setError(undefined);

    try {
      const wallet = wallets[0];
      const balanceInWei = await (
        await wallet.getProvider()
      ).request({
        method: "eth_getBalance",
        params: [wallet.address, "latest"],
      });

      // Convert hex string to decimal and then to ETH
      const balanceInEth = parseInt(balanceInWei, 16) / 1e18;
      setBalance(balanceInEth.toFixed(8) + " ETH");
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch balance")
      );
    } finally {
      setIsLoading(false);
    }
  }, [wallets]);

  // Fetch on mount and when wallet changes
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

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
