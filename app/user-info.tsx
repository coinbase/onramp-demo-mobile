import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { PhoneNumberInput } from "@/components/PhoneNumberInput/PhoneNumberInput";
import { ThemedView } from "@/components/ThemedView";
import { useApp } from "@/context/AppContext";
import { router } from "expo-router";
import { useCallback } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function UserInfoScreen() {
  const { userPhoneNumber, setUserPhoneNumber, userEmail, setUserEmail } =
    useApp();

  const handleDone = useCallback(() => {
    router.back();
  }, []);

  return (
    <ThemedView
      style={[
        {
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 24,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scroll}>
          <View style={{ gap: 24 }}>
            <PhoneNumberInput
              value={userPhoneNumber}
              onChangeText={setUserPhoneNumber}
              onClear={() => setUserPhoneNumber("")}
            />

            <Input
              value={userEmail}
              onChangeText={setUserEmail}
              placeholder="Email"
            />

            <Button onPress={handleDone} title="Done" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    height: "100%",
  },
});
