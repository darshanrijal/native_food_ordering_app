import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function SignIn() {
  const tasks = useQuery(api.tasks.get);

  return (
    <View>
      <Text>Sign In</Text>
      {tasks?.map(({ _id, text }) => (
        <Text key={_id}>{text}</Text>
      ))}

      <Button title="Sign up" onPress={() => router.push("/sign-up")} />
    </View>
  );
}
