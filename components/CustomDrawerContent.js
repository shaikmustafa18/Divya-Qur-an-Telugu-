import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.drawerHeader}>
        <View style={styles.textContainer}>
          <Text style={styles.drawerTitle1}>{"\n"}Divya</Text>
          <Text style={styles.drawerTitle2}>
            Qur'an{"\n"}
            (తెలుగు)
          </Text>
        </View>
        <Image
          source={require("../assets/images/icon2.png")}
          resizeMode="contain"
          style={styles.drawerImage}
        />
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerHeader: {
    height: "40%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
  drawerImage: {
    height: 140,
    width: 140,
  },
  drawerTitle1: {
    marginBottom: -10,
    fontSize: 25,
    fontFamily: "PoppinsMedium",
    color: "#4A4A4A ",
  },
  drawerTitle2: {
    fontSize: 25,
    fontFamily: "PoppinsBold",
    color: "#4A4A4A",
  },
});
