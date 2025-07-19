import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function MenuItemPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = useQuery(api.menu.getOne, { id });

  if (item === undefined) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (item === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-500">Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: item.imageUrl }}
        className="mb-4 h-60 w-full rounded-xl"
        resizeMode="cover"
      />

      <Text className="mb-1 text-3xl font-bold">{item.name}</Text>
      <Text className="mb-3 text-gray-500">{item.category?.name}</Text>

      <Text className="mb-4 text-lg text-gray-700">{item.description}</Text>

      <View className="mb-2 flex-row justify-between">
        <Text className="text-base text-gray-600">Calories:</Text>
        <Text className="text-base font-semibold">{item.calories}</Text>
      </View>

      <View className="mb-2 flex-row justify-between">
        <Text className="text-base text-gray-600">Protein:</Text>
        <Text className="text-base font-semibold">{item.protien}g</Text>
      </View>

      <View className="mb-2 flex-row justify-between">
        <Text className="text-base text-gray-600">Rating:</Text>
        <Text className="text-base font-semibold">{item.rating}⭐</Text>
      </View>

      <View className="mt-6 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-orange-500">
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
}
