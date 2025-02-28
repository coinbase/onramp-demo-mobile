import { Tabs } from "expo-router";
import React from "react";

import WalletIcon from "@/assets/icons/WalletIcon";
import { HapticTab } from "@/components/HapticTab";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: "relative",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={focused ? primaryColor : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <ThemedText
              style={{
                fontSize: 12,
                color: focused ? primaryColor : color,
              }}
            >
              Home
            </ThemedText>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <WalletIcon
              width={28}
              height={28}
              color={focused ? primaryColor : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <ThemedText
              style={{
                fontSize: 12,
                color: focused ? primaryColor : color,
              }}
            >
              Wallet
            </ThemedText>
          ),
        }}
      />
    </Tabs>
  );
}
