import { images } from "@/constants";
import { auth } from "@/lib/auth";
import { clsx } from "clsx";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Platform, Text, View } from "react-native";

export default function Layout() {
  const isAuthenticated = !!auth.getToken();
  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:
          Platform.OS === "ios"
            ? {
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                marginHorizontal: 20,
                height: 80,
                position: "absolute",
                bottom: 40,
                backgroundColor: "white",
                shadowColor: "#1a1a1a",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
              }
            : {},
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon={images.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon={images.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon={images.bag} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              icon={images.person}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}

function TabbarIcon({ focused, icon, title }: TabBarIconProps) {
  return (
    <View className="tab-icon">
      <Image
        source={icon}
        className="size-6"
        resizeMode="contain"
        tintColor={focused ? "#fe8c00" : "#5d5f6d"}
      />
      <Text
        className={clsx(
          "font-quicksand-semibold text-xs",
          focused ? "text-primary" : "text-gray-200",
        )}
      >
        {title}
      </Text>
    </View>
  );
}
