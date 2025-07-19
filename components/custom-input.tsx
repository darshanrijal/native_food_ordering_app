import { CustomInputProps } from "@/types";
import { clsx } from "clsx";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

export const CustomInput = ({
  label,
  keyboardType = "default",
  onChangeText,
  placeholder = "Enter Text",
  secureTextEntry = false,
  value,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={"#aaa"}
        className={clsx(
          "input",
          isFocused ? "border-primary" : "border-gray-300",
        )}
      />
    </View>
  );
};
