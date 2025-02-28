import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
  shimmer?: boolean;
  circle?: boolean;
};

export const Skeleton = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
  children,
  shimmer = true,
  circle = false,
}: SkeletonProps) => {
  const backgroundColor = useThemeColor({}, "secondary");
  const shimmerColor = useThemeColor({}, "foregroundMuted");

  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    if (shimmer) {
      shimmerValue.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      );
    }
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerValue.value, [0, 1], [-100, 100]);

    return {
      transform: shimmer ? [{ translateX }] : [],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: width as number,
          height: height as number,
          borderRadius: circle ? height : borderRadius,
          backgroundColor,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {shimmer && (
        <Animated.View
          style={[
            styles.shimmer,
            { backgroundColor: shimmerColor },
            animatedStyle,
          ]}
        />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
  },
});
