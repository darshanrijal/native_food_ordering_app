import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

interface MenuCardProps {
  menu: Doc<"menu">;
}

export function MenuCard({ menu }: MenuCardProps) {
  return (
    <TouchableOpacity
      className="rounded-2xl bg-white p-4 shadow-md"
      style={
        Platform.OS === "android"
          ? { elevation: 5, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: menu.imageUrl }}
        className="mb-4 size-28 rounded-2xl"
        resizeMode="contain"
      />
      <Text
        className="base-bold mb-1 text-center text-dark-100"
        numberOfLines={1}
      >
        {menu.name}
      </Text>
      <Text className="body-regular mb-3 text-center text-gray-400">
        From NPR {menu.price}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className="paragraph-bold text-center text-primary">
          Add to cart
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
