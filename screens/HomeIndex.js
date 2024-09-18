// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";

// export default function HomeIndex({ navigation }) {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.textContainer}>
//           <Text style={styles.titleText}>The</Text>
//           <Text style={styles.mainTitleText}>Holy Qur'an</Text>
//         </View>
//         <Image
//           source={require("../assets/images/icon2.png")}
//           style={styles.logoImage}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("SurahIndex")}
//         >
//           <Text style={styles.buttonText}>Surah Index</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("JuzzIndex")}
//         >
//           <Text style={styles.buttonText}>Juzz Index</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("Bookmarks")}
//         >
//           <Text style={styles.buttonText}>Bookmarks</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.footer}>
//         <Image
//           source={{ uri: "https://your-quran-image-url-here" }}
//           style={styles.quranImage}
//         />
//         <Text style={styles.quoteText}>
//           "Indeed, It is We who sent down the Qur'an and indeed, We will be its
//           Guardian"
//         </Text>
//         <Text style={styles.surahText}>Surah Al-Hijr</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     width: "100%",
//     justifyContent: "space-between",
//   },
//   textContainer: {
//     flexDirection: "column",
//     flex: 1,
//   },
//   titleText: {
//     fontSize: 24,
//     fontWeight: "300",
//     color: "#888",
//   },
//   mainTitleText: {
//     fontSize: 36,
//     fontWeight: "700",
//     color: "#444",
//   },
//   logoImage: {
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//   },
//   buttonContainer: {
//     marginTop: 40,
//     width: "100%",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#FF6B6B",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 20,
//     marginVertical: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "500",
//   },
//   footer: {
//     marginTop: 40,
//     alignItems: "center",
//   },
//   quranImage: {
//     width: 120,
//     height: 120,
//     resizeMode: "contain",
//     marginBottom: 20,
//   },
//   quoteText: {
//     fontSize: 16,
//     fontStyle: "italic",
//     color: "#444",
//     textAlign: "center",
//     paddingHorizontal: 20,
//   },
//   surahText: {
//     fontSize: 16,
//     color: "#888",
//     marginTop: 10,
//   },
// });
