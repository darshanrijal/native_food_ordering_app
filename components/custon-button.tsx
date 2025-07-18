import { clsx } from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export const CustomButton = ({
  onPress,
  title = "Click me",
  isLoading = false,
  leftIcon,
  className,
  textClassName,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx("custom-btn", className)}
      onPress={onPress}
    >
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={clsx("paragraph-semibole text-white-100", textClassName)}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
