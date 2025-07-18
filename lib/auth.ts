import { USER_AUTH_TOKEN } from "@/constants";
import { deleteItemAsync, getItem, setItemAsync } from "expo-secure-store";
import { Alert } from "react-native";

async function saveToken(token: string) {
  await setItemAsync(USER_AUTH_TOKEN, token);
}

const getToken = () => {
  try {
    const token = getItem(USER_AUTH_TOKEN);
    if (token) {
      return token;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Failed to retrieve token from SecureStore", error);
    return undefined;
  }
};

const deleteToken = async () => {
  try {
    await deleteItemAsync(USER_AUTH_TOKEN);
    console.log("Token deleted from SecureStore!");
  } catch (error) {
    console.error("Failed to delete token from SecureStore", error);
    Alert.alert("Error", "Failed to securely delete your session.");
  }
};

export const auth = {
  getToken,
  saveToken,
  deleteToken,
};
