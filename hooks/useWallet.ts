import { useEtheriumWallet } from "./useEtheriumWallet";
import { useSolanaWallet } from "./useSolanaWallet";

/**
 * Hook to create a wallet if it doesn't exist
 * @param network - The network to create the wallet on
 * @returns The current wallet
 */
export const useWallet = ({ network }: { network: string }) => {
  const { wallets: ethWallets, create: createEthWallet } = useEtheriumWallet();
  const { wallets: solWallets, create: createSolWallet } = useSolanaWallet();

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

  const currentWallet = network === "solana" ? solWallets?.[0] : ethWallets[0];

  return {
    currentWallet,
    sendEthereumTransaction,
    switchEVMChain,
  };
};
