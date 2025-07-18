import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function SignIn() {
  return (
    <View>
      <Text>Sign In</Text>
      <Button title="Sign up" onPress={() => router.push("/sign-up")} />
    </View>
  );
}
