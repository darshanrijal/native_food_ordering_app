import { CartButton } from "@/components/cart-button";
import { Filter } from "@/components/filter";
import { MenuCard } from "@/components/menu-card";
import { Searchbar } from "@/components/searchbar";
import { api } from "@/convex/_generated/api";
import { clsx } from "clsx";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

export default function Search() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [debouncedQuery] = useDebounce(query, 500);

  const shouldFetchMenus = query === "" || query === debouncedQuery;

  const menus = useQuery(
    api.menu.get,
    shouldFetchMenus
      ? {
          query: debouncedQuery || undefined,
          category: activeCategory === "all" ? undefined : activeCategory,
          limit: 6,
        }
      : "skip",
  );

  const categories = useQuery(api.categories.get, {});

  const ListHeader = React.useMemo(
    () => (
      <View className="mb-5 mt-1 gap-5">
        <View className="flex-between w-full flex-row">
          <Text className="paragraph-semibold text-dark-100">
            Find your favorite food
          </Text>
          <CartButton />
        </View>

        <Searchbar value={query} onChange={setQuery} />
        <Filter
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </View>
    ),
    [query, categories, activeCategory],
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={menus}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        keyExtractor={(item) => item._id}
        keyboardShouldPersistTaps="handled"
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
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  );
}
