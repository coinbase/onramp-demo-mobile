import { usePrivy } from "@privy-io/expo";

export const useUser = () => {
  const { user, isReady } = usePrivy();

  return { user, isReady };
};
