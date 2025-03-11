import { LoadingScreen } from "@/components/LoadingScreen/LoadingScreen";
import { router } from "expo-router";
import { useEffect } from "react";

import { useUser } from "@/hooks/useUser";

export default function Index() {
  const { isReady, user } = useUser();

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
