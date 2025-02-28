/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    foregroundMuted: "#5B616E",
    foreground: "#0A0B0D",
    secondary: "#EEF0F3",
    backgroundAlternate: "#EEF0F3",
    lineHeavy: "rgba(91, 97, 110, 0.66)",
    primaryForeground: "#FFF",
    background: "#FFF",
    backdrop: "#000000",
    primary: "#578BFA",
    negative: "#CF202F",
    line: "rgba(91, 97, 110, 0.20)",
    backgroundOverlay: "rgba(50, 53, 61, 0.33)",
  },
  dark: {
    text: "#ECEDEE",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    foregroundMuted: "#8A919E",
    foreground: "#FFF",
    secondary: "#32353D",
    backgroundAlternate: "#141519",
    lineHeavy: "rgba(138, 145, 158, 0.66)",
    primaryForeground: "#0A0B0D",
    background: "#0A0B0D",
    backdrop: "#000000",
    primary: "#578BFA",
    negative: "#F0616D",
    line: "rgba(138, 145, 158, 0.20)",
    backgroundOverlay: "rgba(10, 11, 13, 0.33)",
  },
};
