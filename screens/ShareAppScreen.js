import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Share,
  Pressable,
  Linking,
} from "react-native";
import { useFonts } from "expo-font";
import fonts from "../constants/fonts";

export default function ShareAppScreen() {
  const [fontsLoaded] = useFonts(fonts);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Download the latest no-Ads Divya Qur'an (తెలుగు) App on Play Store: https://play.google.com/store/apps/details?id=com.shaikmustafa.Quraan",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert("An error occurred while sharing the app");
    }
  };

  const onRateAndFeedback = () => {
    Linking.openURL(
      "https://play.google.com/store/apps/details?id=com.shaikmustafa.Quraan"
    );
  };

  const onEmail = () => {
    const email = "traidatacentre@gmail.com";
    const subject = "Feedback for Divya Qur'an App";
    const body = "Hi, I would like to share some feedback...";
    Linking.openURL(
      `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
  };

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <View style={[styles.container]}>
      <Image
        source={require("../assets/images/icon2.png")}
        style={styles.logo}
      />
      <Text style={styles.description}>
        Divya Qur'an (తెలుగు) App is available on PlayStore!
      </Text>
      <Pressable style={styles.button} onPress={onShare}>
        <Text style={styles.buttonText}>Share App</Text>
      </Pressable>
      <Pressable
        onPress={onRateAndFeedback}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "pink" : "white",
          },
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>Rate & Feedback</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onEmail}>
        <Text style={styles.buttonText}>email</Text>
      </Pressable>
      <Text style={styles.version1}>Divya Qur'an (తెలుగు)</Text>
      <Text style={styles.version2}>Version: 5.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    backgroundColor: "#fff",
  },
  logo: {
    marginTop: -2,
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginVertical: 15,
  },
  description: {
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    marginTop: -40,
  },
  button: {
    elevation: 15,
    backgroundColor: "#672CBC",
    paddingVertical: 13,
    borderRadius: 10,
    marginVertical: 6,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  version1: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
    color: "black",
    marginTop: 28,
  },
  version2: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: "black",
    marginTop: 3,
  },
});
