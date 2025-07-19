import { Doc } from "@/convex/_generated/dataModel";
import { useCartStore } from "@/lib/cart";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

interface MenuCardProps {
  menu: Doc<"menu">;
}

export function MenuCard({ menu }: MenuCardProps) {
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      className="rounded-2xl bg-white p-4 shadow-md"
      style={
        Platform.OS === "android"
          ? { elevation: 5, shadowColor: "#878787" }
          : {}
      }
      onPress={() =>
        addItem({
          id: menu._id,
          name: menu.name,
          price: menu.price,
          image_url: menu.imageUrl,
        })
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
      <TouchableOpacity
        onPress={() => {
          addItem({
            id: menu._id,
            name: menu.name,
            price: menu.price,
            image_url: menu.imageUrl,
          });
        }}
      >
        <Text className="paragraph-bold text-center text-primary">
          Add to cart
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
