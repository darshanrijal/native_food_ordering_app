import { CustomInput } from "@/components/custom-input";
import { CustomButton } from "@/components/custon-button";
import { api } from "@/convex/_generated/api";
import { auth } from "@/lib/auth";
import { useMutation } from "convex/react";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const signIn = useMutation(api.users.signIn);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter a valid email address and password");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await signIn(form);

      if (res.error) {
        throw new Error(res.error);
      }

      if (res.id) {
        await auth.saveToken(res.id);
        Alert.alert("Success", "User signed in successfully");
        router.replace("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="mt-5 gap-10 rounded-lg bg-white p-5">
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
          Don&apos;t have an account?
        </Text>
        <Link href={"/sign-up"} className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
}
