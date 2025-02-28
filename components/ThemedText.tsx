import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  font?:
    | "regular"
    | "medium"
    | "bold"
    | "light"
    | "lightItalic"
    | "mediumItalic"
    | "boldItalic"
    | "extraLight"
    | "extraLightItalic";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  font = "regular",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        font === "regular" ? styles.regular : undefined,
        font === "medium" ? styles.medium : undefined,
        font === "bold" ? styles.bold : undefined,
        font === "light" ? styles.light : undefined,
        font === "lightItalic" ? styles.lightItalic : undefined,
        font === "mediumItalic" ? styles.mediumItalic : undefined,
        font === "boldItalic" ? styles.boldItalic : undefined,
        font === "extraLight" ? styles.extraLight : undefined,
        font === "extraLightItalic" ? styles.extraLightItalic : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  regular: {
    fontFamily: "CoinbaseDisplay-Regular",
  },
  medium: {
    fontFamily: "CoinbaseDisplay-Medium",
  },
  bold: {
    fontFamily: "CoinbaseDisplay-Bold",
  },
  light: {
    fontFamily: "CoinbaseDisplay-Light",
  },
  lightItalic: {
    fontFamily: "CoinbaseDisplay-LightItalic",
  },
  mediumItalic: {
    fontFamily: "CoinbaseDisplay-MediumItalic",
  },
  boldItalic: {
    fontFamily: "CoinbaseDisplay-BoldItalic",
  },
  extraLight: {
    fontFamily: "CoinbaseDisplay-ExtraLight",
  },
  extraLightItalic: {
    fontFamily: "CoinbaseDisplay-ExtraLightItalic",
  },
});
