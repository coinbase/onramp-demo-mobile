import { useLoginWithOAuth } from "@privy-io/expo";

export const useLogin = () => {
  const { login } = useLoginWithOAuth();

  return { login };
};
