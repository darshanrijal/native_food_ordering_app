import { images } from "@/constants";
import { useCartStore } from "@/lib/cart";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const CartButton = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <Pressable
      android_ripple={{
        color: "#ffffff50",
        radius: Number.POSITIVE_INFINITY,
      }}
      className="relative size-10 items-center justify-center rounded-full bg-dark-100"
      onPress={() => {
        router.push("/cart");
      }}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        <View className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-primary">
          <Text className="text-xs text-white">{totalItems}</Text>
        </View>
      )}
    </Pressable>
  );
};
