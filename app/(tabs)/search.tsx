import { CartButton } from "@/components/cart-button";
import { MenuCard } from "@/components/menu-card";
import { api } from "@/convex/_generated/api";
import { clsx } from "clsx";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const params = useLocalSearchParams<{ category: string; name: string }>();
  const menus = useQuery(api.menu.get, {
    ...params,
    limit: 6,
  });
  const categories = useQuery(api.categories.get, {});
  if (menus === undefined || categories === undefined) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"orange"} />;
      </View>
    );
  }
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={menus}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const isFirstRight = index % 2 === 0;
          return (
            <View
              className={clsx(
                "max-w-[48%] flex-1",
                !isFirstRight ? "mt-10" : "mt-0",
              )}
            >
              <MenuCard menu={item} />
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="mb-5 mt-1 gap-5">
            <View className="flex-between w-full flex-row">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  search
                </Text>
                <View className="flex-start mt-2.5 flex-row gap-x-1">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <Text>Search Input</Text>
            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() =>
          menus !== undefined && <Text>No results</Text>
        }
      />
    </SafeAreaView>
  );
}
