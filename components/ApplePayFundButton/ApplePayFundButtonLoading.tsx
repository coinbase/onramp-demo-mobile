import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, StyleSheet } from "react-native";
import { APPLE_PAY_BUTTON_HEIGHT, APPLE_PAY_BUTTON_RADIUS } from "./constants";

const ApplePayFundButtonLoading = ({ isLoading }: { isLoading: boolean }) => {
  const [isRendered, setIsRendered] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateLoadingOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsRendered(false);
    });
  };

  useEffect(() => {
    if (!isLoading) {
      animateLoadingOut();
    } else {
      setIsRendered(true);
      fadeAnim.setValue(1);
    }
  }, [isLoading]);

  return (
    isRendered && (
      <Animated.View
        style={[
          styles.loadingContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <ActivityIndicator size="small" color="white" />
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    borderRadius: APPLE_PAY_BUTTON_RADIUS,
    height: APPLE_PAY_BUTTON_HEIGHT,
    backgroundColor: "#0052FF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default ApplePayFundButtonLoading;
