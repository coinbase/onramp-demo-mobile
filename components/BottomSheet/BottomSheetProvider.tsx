import { useThemeColor } from "@/hooks/useThemeColor";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomSheetContextType = {
  showBottomSheet: (
    content: React.ReactNode,
    snapPoints?: string[],
    enableDynamicSizing?: boolean
  ) => void;
  hideBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within BottomSheetProvider");
  }
  return context;
};

export const BottomSheetProvider = memo(
  ({ children }: { children: React.ReactNode }) => {
    const backgroundColor = useThemeColor({}, "background");
    const foregroundMuted = useThemeColor({}, "foregroundMuted");

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [content, setContent] = useState<React.ReactNode>(null);
    const [points, setPoints] = useState<string[]>(["85%"]);
    const [isReady, setIsReady] = useState(false);
    const [enableDynamicSizing, setEnableDynamicSizing] = useState(false);

    const insets = useSafeAreaInsets();
    useEffect(() => {
      // Ensure the component is mounted
      setIsReady(true);
      return () => setIsReady(false);
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          enableTouchThrough={false}
          pressBehavior="close"
          style={[props.style, { backgroundColor: foregroundMuted }]}
        />
      ),
      [foregroundMuted]
    );

    const showBottomSheet = useCallback(
      (
        newContent: React.ReactNode,
        snapPoints?: string[],
        enableDynamicSizing?: boolean
      ) => {
        if (!isReady) return;

        setPoints(snapPoints || ["85%"]);
        setEnableDynamicSizing(enableDynamicSizing || false);

        requestAnimationFrame(() => {
          // setPoints is not updated immediately, so we need to wait for the next frame
          setTimeout(() => {
            bottomSheetRef.current?.expand();
          }, 1);
        });
        setContent(newContent);
      },
      [isReady]
    );

    const hideBottomSheet = useCallback(() => {
      if (!isReady) return;
      bottomSheetRef.current?.close();
    }, [isReady]);

    return (
      <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
        {children}
        {isReady && (
          <BottomSheet
            maxDynamicContentSize={
              Dimensions.get("screen").height - insets.top - 50
            }
            enableDynamicSizing={enableDynamicSizing}
            ref={bottomSheetRef}
            index={-1}
            snapPoints={points}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{
              backgroundColor: backgroundColor,
              width: 64,
              height: 4,
              position: "absolute",
              top: content ? -12 : 0,
            }}
            onChange={(index) => {
              if (index === -1) setContent(null);
            }}
            backgroundStyle={{ backgroundColor }}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="none"
            android_keyboardInputMode="adjustResize"
          >
            <View style={styles.contentContainer}>{content}</View>
          </BottomSheet>
        )}
      </BottomSheetContext.Provider>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
