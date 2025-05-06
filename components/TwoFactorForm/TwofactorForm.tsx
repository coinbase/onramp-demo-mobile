import { useCallback, useState } from "react";
import { PhoneNumberInput } from "@/components/PhoneNumberInput/PhoneNumberInput";
import { CodeInput } from "@/components/CodeInput/CodeInput";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button/Button";
import { StyleSheet, View } from "react-native";
import { useApp } from "@/context/AppContext";
type TwoFactorFormProps = {
    onCodeSubmit: (code: string) => void;
}

export const TwoFactorForm = ({
    onCodeSubmit,
}: TwoFactorFormProps) => {
    const { userPhoneNumber } = useApp();
    const [step, setStep] = useState<"phone" | "code">("phone");
    const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber ?? "");
    const [code, setCode] = useState("");
    const { setUserPhoneNumber } = useApp();

    const handleOnPhoneNumberSubmit = useCallback(() => {
        setStep("code");
        setUserPhoneNumber(phoneNumber);
    }, [phoneNumber, setUserPhoneNumber]);

    const handleOnCodeSubmit = useCallback((text: string) => {
        setCode(text);
        if (code.length === 5) {
            onCodeSubmit(code);
        }
    }, [code, onCodeSubmit]);

    const handleOnPhoneNumberClear = useCallback(() => {
        setPhoneNumber("");
        setUserPhoneNumber(null);
    }, [setUserPhoneNumber]);
    
  return (
    <ThemedView style={{ height: "100%", flex: 1, flexDirection: "column", gap: 24, alignItems: "center", justifyContent: "space-between" }} >
      {step === "phone" ? (
        <PhoneNumberInput value={phoneNumber} onChangeText={setPhoneNumber} onClear={handleOnPhoneNumberClear} />
      ) : (
        <CodeInput value={code} onChangeText={handleOnCodeSubmit} />
      )}
        <View style={styles.buttonContainer}>
          <Button onPress={handleOnPhoneNumberSubmit} title={step === "phone" ? "Next" : "Continue"} />
        </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
});