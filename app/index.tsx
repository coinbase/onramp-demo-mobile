import { LoadingScreen } from "@/components/LoadingScreen/LoadingScreen";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { isReady, user } = usePrivy();

  useEffect(() => {
    if (!isReady) return;

    if (user) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/login");
    }
  }, [isReady, user]);

  return <LoadingScreen message="Initializing app..." />;
}
