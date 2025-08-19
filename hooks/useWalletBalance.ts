import { useCallback, useEffect, useState } from "react";
import { useEtheriumWallet } from "./useEtheriumWallet";
import { useSolanaClient } from "./useSolanaClient";
import { useSolanaWallet } from "./useSolanaWallet";
import { CreateOrderResponse, TokenBalanceResponse } from "@/components/ApplePayFundButton/types";
import { useApiClient } from "@/services/apiClient";

export const useWalletBalance = ({
  network,
}: {
  network: "ethereum" | "solana";
}) => {
  const [balance, setBalance] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const apiClient = useApiClient();
  
  const { wallets: ethWallets } = useEtheriumWallet();
  const { wallets: solWallets } = useSolanaWallet();
  const solanaClient = useSolanaClient();

  const fetchBalanceCoinbase = useCallback(async (address: string) => {
    try {
    const response = await apiClient.request<TokenBalanceResponse>(
      `/onramp/token-balance/${address}/${network}`,
      {
        method: "GET",
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, [apiClient]);



  const fetchBalance = useCallback(async () => {
    if (network === "ethereum" && ethWallets.length === 0) return;
    if (network === "solana" && solWallets?.length === 0) return;

    setIsLoading(true);
    setError(undefined);

    try {
      //const result = await fetchBalanceCoinbase(ethWallets[0].address);
      //console.log("balance", result.balances[4].token);

      if (network === "solana") {
        const wallet = solWallets?.[0];

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
