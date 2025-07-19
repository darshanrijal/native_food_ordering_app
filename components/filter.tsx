import { Doc } from "@/convex/_generated/dataModel";
import { clsx } from "clsx";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

export function Filter({
  categories,
  active,
  onSelect,
}: {
  categories: Doc<"categories">[] | null | undefined;
  active: string;
  onSelect: (id: string) => void;
}) {
  const data = [{ _id: "all", name: "All" }, ...(categories ?? [])];

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item._id}
          className={clsx(
            "rounded-full px-4 py-2",
            active === item._id ? "bg-primary" : "",
          )}
          onPress={() => onSelect(item._id)}
        >
          <Text
            className={clsx(
              "text-sm font-semibold",
              active === item._id ? "text-white" : "text-gray-500",
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
