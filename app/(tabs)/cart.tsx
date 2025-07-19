import { CartItem } from "@/components/cart-item";
import { CustomHeader } from "@/components/custom-header";
import { CustomButton } from "@/components/custon-button";
import { useCartStore } from "@/lib/cart";
import { PaymentInfoStripeProps } from "@/types";
import { clsx } from "clsx";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-between my-1 flex-row">
    <Text className={clsx("paragraph-medium text-gray-200", labelStyle)}>
      {label}
    </Text>
    <Text className={clsx("paragraph-bold text-dark-100", valueStyle)}>
      {value}
    </Text>
  </View>
);

export default function Cart() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <CartItem item={item} />;
        }}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => (
          <Text className="text-center font-quicksand-bold text-neutral-400">
            Cart is empty, Click on the item to add to cart
          </Text>
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 rounded-2xl border border-gray-200 p-5">
                <Text className="h3-bold mb-5 text-dark-100">
                  Payment Summart
                </Text>

                <PaymentInfoStripe
                  label={`Total Items ${totalItems}`}
                  value={totalPrice.toFixed(2)}
                />
                <PaymentInfoStripe label={`Delivery Fee`} value={"5"} />
                <PaymentInfoStripe
                  label={`Discount`}
                  value={"-0.5"}
                  valueStyle="!text-success"
                />

                <View className="my-2 border-t border-gray-300"></View>
                <PaymentInfoStripe
                  label={`Total`}
                  value={(totalPrice + 5 - 0.5).toFixed(2)}
                  labelStyle="base-bold text-dark-100"
                  valueStyle="base-bold !text-dark-100 !text-right"
                />
              </View>
              <CustomButton title="Order now" />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
