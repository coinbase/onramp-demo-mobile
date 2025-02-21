import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OAuthProviderType, useLoginWithOAuth } from "@privy-io/expo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
    name: "twitter",
    icon: "twitter",
    color: "#1DA1F2",
  },
];

export default function LoginScreen() {
  // const { login } = useLogin();
  const insets = useSafeAreaInsets();
  const { login } = useLoginWithOAuth();

  const handleLogin = async (loginProvider: OAuthProviderType) => {
    try {
      await login({
        provider: loginProvider,
      });
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
    }
  };

  return (
    <LinearGradient
      colors={["#1D3D47", "#0A1A1F"]}
      style={[styles.container, { paddingTop: insets.top + 40 }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/onramp-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText type="title" style={styles.title}>
            Welcome to Onramp Demo
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Your gateway to coinbase onramp solution
          </ThemedText>
        </View>

        <View style={styles.loginButtons}>
          {LOGIN_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.button, { backgroundColor: method.color }]}
              onPress={() => handleLogin(method.id)}
            >
              <MaterialCommunityIcons
                name={method.icon as any}
                size={24}
                color="#FFFFFF"
              />
              <ThemedText style={styles.buttonText}>
                Continue with {method.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </ThemedText>
      </View>
    </LinearGradient>
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
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
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
  },
  loginButtons: {
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  buttonText: {
    color: "#FFFFFF",
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
