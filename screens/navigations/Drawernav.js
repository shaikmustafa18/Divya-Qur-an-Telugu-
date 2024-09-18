import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import LoadingScreen from "../LoadingScreen";
import SurahIndex from "../SurahIndex";
import SettingsScreen from "../SettingsScreen";
import AboutusScreen from "../AboutusScreen";
import ShareAppScreen from "../ShareAppScreen";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import fonts from "../../constants/fonts";
import BookmarkScreen from "../BookmarkScreen";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const [textSize, setTextSize] = useState(25);
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    const loadTextSize = async () => {
      try {
        const storedTextSize = await AsyncStorage.getItem("textSize");
        if (storedTextSize) {
          setTextSize(JSON.parse(storedTextSize));
        }
      } catch (error) {
        console.error("Failed to load text size", error);
      }
    };
    loadTextSize();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: "80%",
          },
          drawerPosition: "left",
          drawerType: "slide",
          drawerActiveBackgroundColor: "#3CFFA1",
          drawerActiveTintColor: "black",
          drawerInactiveTintColor: "#285B42",
          drawerLabelStyle: {
            fontSize: 20,
            color: "black",
            fontFamily: "PoppinsRegular",
          },
          drawerItemStyle: {
            marginVertical: 5,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 3.84,
            elevation: 15,
          },
        }}
      >
        <Drawer.Screen
          name="Surah List"
          component={SurahIndex}
          options={{
            headerTitle: "Surah List",
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "#672CBC",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
              fontFamily: "PoppinsBold", // Set your custom font family here
            },
            drawerIcon: () => <MaterialIcons name="sort" size={28} />,
          }}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            headerTitle: "Settings‌",
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "#672CBC",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
              fontFamily: "PoppinsBold",
            },
            drawerIcon: () => <Ionicons name="settings-outline" size={28} />,
          }}
        >
          {(props) => (
            <SettingsScreen
              {...props}
              textSize={textSize}
              setTextSize={setTextSize}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            headerTitle: "Bookmark",
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "#672CBC",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
              fontFamily: "PoppinsBold", // Set your custom font family here
            },
            drawerIcon: () => <Feather name="bookmark" size={28} />,
          }}
        />
        <Drawer.Screen
          name="Introduction"
          component={AboutusScreen}
          options={{
            headerTitle: "Introduction",
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "#672CBC",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
              fontFamily: "PoppinsBold", // Set your custom font family here
            },
            drawerIcon: () => <AntDesign name="exclamationcircleo" size={28} />,
          }}
        />
        <Drawer.Screen
          name="Share App"
          component={ShareAppScreen}
          options={{
            headerTitle: "Share App",

            headerTintColor: "#672CBC",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
              fontFamily: "PoppinsBold", // Set your custom font family here
            },
            drawerIcon: () => (
              <Ionicons name="share-social-outline" size={28} />
            ),
          }}
        />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
