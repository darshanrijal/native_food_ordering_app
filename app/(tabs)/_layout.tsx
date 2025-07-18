import { auth } from "@/lib/auth";
import { Redirect, Slot } from "expo-router";
import React from "react";

export default function Layout() {
  const isAuthenticated = !!auth.getToken();
  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }
  return <Slot />;
}
