import { images } from "@/constants";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const CartButton = () => {
  const totalItems = 10;
  return (
    <Pressable
      android_ripple={{
        color: "#ffffff50",
        radius: Infinity,
      }}
      className="cart-btn"
      onPress={() => {}}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </Pressable>
  );
};
