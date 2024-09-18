import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Drawernav from "../navigations/Drawernav";
import ViewSurah from "../../screens/ViewSurah";
import SettingsScreen from "../../screens/SettingsScreen";
import AboutusScreen from "../../screens/AboutusScreen";
import ShareAppScreen from "../../screens/ShareAppScreen";
import BookmarkScreen from "../../screens/BookmarkScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DrawerNav"
          component={Drawernav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewSurah"
          component={ViewSurah}
          options={({ route }) => ({
            headerTitle: route?.params?.name || "View Surah",
            headerStyle: { backgroundColor: "#ffff" },
            headerTintColor: "#672CBC",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          })}
        />
        <Stack.Screen
          name="BookmarkScreen"
          component={BookmarkScreen}
          options={{ title: "Bookmarks" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerStyle: { backgroundColor: "#02753e" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="About us"
          component={AboutusScreen}
          options={{
            headerStyle: { backgroundColor: "#02753e" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Share App"
          component={ShareAppScreen}
          options={{
            headerStyle: { backgroundColor: "#02753e" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
