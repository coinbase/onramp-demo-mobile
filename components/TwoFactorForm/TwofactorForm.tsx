import { useCallback, useState } from "react";
import { PhoneNumberInput } from "@/components/PhoneNumberInput/PhoneNumberInput";
import { CodeInput } from "@/components/CodeInput/CodeInput";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button/Button";

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
    <ThemedView style={{ gap: 24, justifyContent: "space-between", alignItems: "center" }} >
      {step === "phone" ? (
        <PhoneNumberInput value={phoneNumber} onChangeText={setPhoneNumber} />
      ) : (
        <CodeInput value={code} onChangeText={handleOnCodeSubmit} />
      )}
      <Button  onPress={handleOnPhoneNumberSubmit} title={step === "phone" ? "Next" : "Continue"} />
    </ThemedView>
  );
};