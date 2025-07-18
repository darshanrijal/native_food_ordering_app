import { CartButton } from "@/components/cart-button";
import { images, offers } from "@/constants";
import { api } from "@/convex/_generated/api";
import { auth } from "@/lib/auth";
import { clsx } from "clsx";
import { useQuery } from "convex/react";
import { Redirect } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const userId = auth.getToken();

  const user = useQuery(api.users.getUser, { userId });

  if (user === undefined) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator color={"orange"} />
      </View>
    );
  }

  if (user === null) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        ListHeaderComponent={
          <View className="flex-between my-5 w-full flex-row">
            <View className="flex-start">
              <Text className="small-bold text-primary">Delivered to</Text>
              <TouchableOpacity className="flex-center mt-0.5 flex-row gap-x-1">
                <Text className="paragraph-bold text-dark-100">Nepal</Text>
                <Image
                  className="size-3"
                  resizeMode="contain"
                  source={images.arrowDown}
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        }
        renderItem={({ index, item }) => {
          const isEven = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={clsx(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row",
                )}
                android_ripple={{
                  color: "#ffffff22",
                }}
                style={{
                  backgroundColor: item.color,
                }}
              >
                {() => (
                  <React.Fragment>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={clsx(
                        "offer-card__info",
                        isEven ? "pl-8" : "pr-8",
                      )}
                    >
                      <Text className="h1-bold leading-tight text-white">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor={"white"}
                      />
                    </View>
                  </React.Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  );
}
