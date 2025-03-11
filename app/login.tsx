import OnrampBrandLogo from "@/assets/images/OnrampBrandLogo";
import OnrampBrandLogoDark from "@/assets/images/OnrampBrandLogoDark";
import { ThemedText } from "@/components/ThemedText";
import { useApp } from "@/context/AppContext";
import { useLogin } from "@/hooks/useLogin";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome6 } from "@expo/vector-icons";
import { OAuthProviderType } from "@privy-io/expo";
import { router } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type LoginMethod = {
  id: OAuthProviderType;
  name: string;
  icon: string;
  color: string;
};

const LOGIN_METHODS: LoginMethod[] = [
  {
    id: "google",
    name: "Google",
    icon: "google",
    color: "#DB4437",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "github",
    color: "#333",
  },
  {
    id: "discord",
    name: "discord",
    icon: "discord",
    color: "#7289DA",
  },
  {
    id: "twitter",
    name: "X",
    icon: "x-twitter",
    color: "#1DA1F2",
  },
];

export default function LoginScreen() {
  const theme = useColorScheme() ?? "light";
  const secondary = useThemeColor({}, "secondary");
  const foreground = useThemeColor({}, "foreground");
  const insets = useSafeAreaInsets();
  const { login } = useLogin();

  const { setAppLoading, setAppLoadingMessage } = useApp();

  const handleLogin = async (loginProvider: OAuthProviderType) => {
    try {
      setAppLoading(true);
      setAppLoadingMessage("Logging in...");
      await login({
        provider: loginProvider,
      });
      setAppLoading(false);
      router.replace("/(tabs)/home");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("User is already logged in")
      ) {
        router.replace("/(tabs)/home");
      } else {
        console.error("Login failed:", error);
      }
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 40 }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          {theme === "light" ? <OnrampBrandLogo /> : <OnrampBrandLogoDark />}
          <ThemedText style={styles.subtitle}>
            This is a demo app of how the Coinbase Onramp works
          </ThemedText>
        </View>

        <View style={styles.loginButtons}>
          {LOGIN_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.button, { backgroundColor: secondary }]}
              onPress={() => handleLogin(method.id)}
            >
              <ThemedText
                font="medium"
                style={[styles.buttonText, { color: foreground }]}
              >
                Sign in with {method.name}
              </ThemedText>
              <FontAwesome6
                name={method.icon as any}
                size={24}
                color={foreground}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
    paddingVertical: 24,
  },
  loginButtons: {
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    gap: 12,
    //backgroundColor: "#ffffff10",

    overflow: "hidden",
  },
  buttonText: {
    //color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 40,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    opacity: 0.5,
  },
});
