import { api } from "@/convex/_generated/api";
import { auth } from "@/lib/auth";
import { useQuery } from "convex/react";
import { Redirect, router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const userId = auth.getToken();

  const user = useQuery(api.users.getUser, userId ? { userId } : "skip");

  if (user === undefined) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"orange"} />
      </View>
    );
  }

  if (user === null) {
    return <Redirect href="/sign-in" />;
  }

  const handleLogout = () => {
    auth.deleteToken(); // Adjust this if your logout method differs
    router.push("/sign-in");
    Alert.alert("Logged out", "You have been signed out.");
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mt-8 items-center">
        {user.avatarUrl ? (
          <Image
            source={{ uri: user.avatarUrl }}
            className="h-24 w-24 rounded-full"
          />
        ) : (
          <View className="h-24 w-24 items-center justify-center rounded-full bg-gray-300">
            <Text className="text-xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <Text className="mt-4 text-2xl font-bold">{user.name}</Text>
        <Text className="text-gray-500">{user.email}</Text>
      </View>

      <View className="mt-10">
        <TouchableOpacity
          onPress={handleLogout}
          className="items-center rounded-md bg-orange-500 py-3"
        >
          <Text className="font-semibold text-white">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
