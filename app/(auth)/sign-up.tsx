import { CustomInput } from "@/components/custom-input";
import { CustomButton } from "@/components/custon-button";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      return Alert.alert("Error", "Enter all valid fields");
    }

    setIsSubmitting(true);

    try {
      // Sign in fn

      Alert.alert("Success", "User registered successfully");
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="mt-5 gap-4 rounded-lg bg-white p-5">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(t) => setForm((prev) => ({ ...prev, name: t }))}
        label="Name"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(t) => setForm((prev) => ({ ...prev, email: t }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(t) => setForm((prev) => ({ ...prev, password: t }))}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign in" isLoading={isSubmitting} onPress={submit} />

      <View className="mt-5 flex flex-row justify-center gap-1">
        <Text className="base-regular text-gray-200">
          Already have an account?
        </Text>
        <Link href={"/sign-in"} className="base-bold text-primary">
          Sign in
        </Link>
      </View>
    </View>
  );
}
