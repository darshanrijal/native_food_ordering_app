import { images } from "@/constants";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const CartButton = () => {
  const totalItems = 10;

  return (
    <Pressable
      android_ripple={{
        color: "#ffffff50",
        radius: Number.POSITIVE_INFINITY,
      }}
      className="relative size-10 items-center justify-center rounded-full bg-dark-100"
      onPress={() => {}}
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
