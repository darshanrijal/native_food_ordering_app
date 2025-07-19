import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function Searchbar({ value, onChange }: Props) {
  return (
    <View className="rounded-md border border-gray-300 px-4 py-2">
      <TextInput
        placeholder="Search"
        value={value}
        onChangeText={onChange}
        className="text-base"
        returnKeyType="search"
        autoFocus={false}
      />
    </View>
  );
}
