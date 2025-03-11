import { SolanaClient } from "@privy-io/expo";

export const useSolanaClient = () => {
  const solanaClient = new SolanaClient({
    name: "mainnet-beta",
    rpcUrl: "https://api.mainnet-beta.solana.com",
  });

  return solanaClient;
};
