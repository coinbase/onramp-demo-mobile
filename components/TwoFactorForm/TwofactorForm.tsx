import { useCallback, useState } from "react";
import { PhoneNumberInput } from "@/components/PhoneNumberInput/PhoneNumberInput";
import { CodeInput } from "@/components/CodeInput/CodeInput";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button/Button";
import { StyleSheet, View } from "react-native";

type TwoFactorFormProps = {
    onCodeSubmit: (code: string) => void;
}

export const TwoFactorForm = ({
    onCodeSubmit,
}: TwoFactorFormProps) => {
    const [step, setStep] = useState<"phone" | "code">("phone");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");

    const handleOnPhoneNumberSubmit = useCallback(() => {
        setStep("code");
    }, []);

    const handleOnCodeSubmit = useCallback((text: string) => {
        setCode(text);
        console.log("code", code);
        if (code.length === 5) {
            console.log("submitted code", code);
            onCodeSubmit(code);
        }
    }, [code, onCodeSubmit]);
    
  return (
    <ThemedView style={{ height: "100%", flex: 1, flexDirection: "column", gap: 24, alignItems: "center", justifyContent: "space-between" }} >
      {step === "phone" ? (
        <PhoneNumberInput value={phoneNumber} onChangeText={setPhoneNumber} />
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