import { usePrivy } from "@privy-io/expo";

export const useLogout = () => {
  const { logout } = usePrivy();

  return { logout };
};
