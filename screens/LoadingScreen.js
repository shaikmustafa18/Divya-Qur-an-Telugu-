import { StyleSheet, Text, View, Image } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require("../assets/images/calligraphylogo.png")} // Update with your logo's path
        style={styles.logo}
      />
      <Text style={styles.loadingText}>Initializing data.....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  loadingText: {
    color: "#383838",
    fontSize: 20,
  },
});
