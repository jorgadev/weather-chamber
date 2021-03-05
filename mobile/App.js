import * as React from "react";
// import { useState } from "react";
// import { Text, View, StyleSheet, Alert } from "react-native";
// import { SearchBar, Button, Image } from "react-native-elements";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useEffect } from "react";
// import MapView, { Marker } from "react-native-maps";

// server ip address
const ip = "http://192.168.64.102:3000/";
//const ip = "http://10.240.47.35:3000/";

// home screen
// function HomeScreen({ navigation }) {
function HomeScreen() {
  // // define hooks
  // const [name, setName] = useState("None");
  // const [country, setCountry] = useState("ERR");
  // const [temp, setTemp] = useState("0");
  // const [humidity, setHumidity] = useState("0");
  // const [pressure, setPressure] = useState("0");
  // const [wind, setWind] = useState("0");
  // const [description, setDescription] = useState("none");
  // const [icon, setIcon] = useState("01n");
  // useEffect(() => {
  //   // on home screen focus fetch data from api
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     fetch(ip)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         // set variables to response data
  //         setName(json.name);
  //         setCountry(json.country);
  //         setTemp(json.temp);
  //         setPressure(json.pressure);
  //         setWind(json.wind);
  //         setHumidity(json.humidity);
  //         setDescription(
  //           json.description
  //             .split(" ")
  //             .map((x) => x[0].toUpperCase() + x.slice(1))
  //             .join(" ")
  //         );
  //         setIcon(json.icon);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       marginTop: 30,
  //       padding: 10,
  //     }}
  //   >
  //     <View
  //       style={{
  //         backgroundColor: "#fff",
  //         flex: 2,
  //         paddingVertical: 30,
  //         paddingHorizontal: 5,
  //       }}
  //     >
  //       <Text
  //         style={{
  //           fontSize: 32,
  //           fontFamily: "sans-serif-light",
  //           textAlign: "center",
  //           marginBottom: 20,
  //         }}
  //       >
  //         {name}, {country}
  //       </Text>
  //       <View
  //         style={{
  //           flex: 1,
  //           flexDirection: "row",
  //         }}
  //       >
  //         <View
  //           style={{
  //             flex: 1,
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Image
  //             source={{
  //               uri: "http://openweathermap.org/img/wn/" + icon + "@2x.png",
  //             }}
  //             style={{ width: 100, height: 100 }}
  //           />
  //           <Text style={{ fontSize: 16, color: "#555" }}>{description}</Text>
  //         </View>
  //         <View
  //           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //         >
  //           <Text style={{ fontSize: 64 }}>{temp}°</Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: "#fff",
  //         marginTop: 10,
  //         flexDirection: "row",
  //       }}
  //     >
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Text style={{ color: "#999", marginBottom: 10 }}>Wind</Text>
  //         <Text>{wind} km/h</Text>
  //       </View>
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           borderLeftWidth: 5,
  //           borderLeftColor: "#eee",
  //           borderRightWidth: 5,
  //           borderRightColor: "#eee",
  //         }}
  //       >
  //         <Text style={{ color: "#999", marginBottom: 10 }}>Humidity</Text>
  //         <Text>{humidity} %</Text>
  //       </View>
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Text style={{ color: "#999", marginBottom: 10 }}>Pressure</Text>
  //         <Text>{pressure} bar</Text>
  //       </View>
  //     </View>
  //     <View
  //       style={{ flex: 2, backgroundColor: "royalblue", marginTop: 10 }}
  //     ></View>
  //   </View>
  // );
  return null;
}

// map screen
function MapScreen({ navigation }) {
  // // declare map variables
  // const [search, changeSearch] = useState("");
  // const [lat, changeLat] = useState(46.54489);
  // const [lon, changeLon] = useState(14.95645);
  // let cityName;

  // useEffect(() => {
  //   // on home screen focus fetch data from api
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     fetch(ip)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         // set variables to response data
  //         changeLat(json.coord.lat);
  //         changeLon(json.coord.lon);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // return (
  //   <View style={{ flex: 1, marginTop: 30, padding: 10 }}>
  //     <SearchBar
  //       placeholder="City.."
  //       platform="android"
  //       onChangeText={changeSearch}
  //       value={search}
  //       containerStyle={{ paddingBottom: 0, paddingTop: 0 }}
  //     />
  //     <Button
  //       title="Apply"
  //       onPress={() => {
  //         if (search != "") {
  //           cityName = search;
  //           fetch(ip + "city/" + cityName)
  //             .then((response) => response.json())
  //             .then((json) => {
  //               Alert.alert(
  //                 "Change city",
  //                 'You changed city to "' + cityName + '" ?',
  //                 [
  //                   {
  //                     text: "OK",
  //                     onPress: () => {
  //                       if (json.cod == 200) {
  //                         changeLat(json.coord.lat);
  //                         changeLon(json.coord.lon);
  //                         navigation.navigate("Home");
  //                       } else {
  //                         Alert.alert(
  //                           "Invalid name",
  //                           "You inserted invalid name",
  //                           [
  //                             {
  //                               text: "OK",
  //                             },
  //                           ],
  //                           { cancelable: false }
  //                         );
  //                       }
  //                     },
  //                   },
  //                 ],
  //                 { cancelable: false }
  //               );
  //             });
  //         }
  //       }}
  //     />
  //     <MapView
  //       style={{ position: "relative", flex: 1, marginTop: 10 }}
  //       initialRegion={{
  //         latitude: lat,
  //         longitude: lon,
  //         latitudeDelta: 20,
  //         longitudeDelta: 20,
  //       }}
  //       onPress={(e) => {
  //         changeLat(e.nativeEvent.coordinate.latitude);
  //         changeLon(e.nativeEvent.coordinate.longitude);
  //         fetch(
  //           ip +
  //             "coord/lat=" +
  //             e.nativeEvent.coordinate.latitude +
  //             "&lon=" +
  //             e.nativeEvent.coordinate.longitude
  //         )
  //           .then((response) => response.json())
  //           .then((json) => {
  //             Alert.alert(
  //               "Change city",
  //               'You changed city to "' + json.name + '" ?',
  //               [
  //                 {
  //                   text: "OK",
  //                   onPress: () => {
  //                     if (json.cod == 200) {
  //                       navigation.navigate("Home");
  //                     }
  //                   },
  //                 },
  //               ],
  //               { cancelable: false }
  //             );
  //           });
  //       }}
  //     >
  //       <Marker coordinate={{ latitude: lat, longitude: lon }} />
  //     </MapView>
  //   </View>
  // );
  return null;
}

// camera screen
function CameraScreen() {
  // return (
  //   <View
  //     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //   ></View>
  // );
  return null;
}

// const Tab = createBottomTabNavigator();

export default function App() {
  // return (
  //   <NavigationContainer>
  //     <Tab.Navigator
  //       screenOptions={({ route }) => ({
  //         tabBarIcon: ({ focused, color, size }) => {
  //           let iconName;

  //           if (route.name === "Home") {
  //             iconName = focused ? "ios-home" : "ios-home-outline";
  //           } else if (route.name === "Map") {
  //             iconName = focused ? "ios-locate" : "ios-locate-outline";
  //           } else if (route.name === "Camera") {
  //             iconName = focused ? "ios-camera" : "ios-camera-outline";
  //           }

  //           // You can return any component that you like here!
  //           return <Ionicons name={iconName} size={size} color={color} />;
  //         },
  //       })}
  //       tabBarOptions={{
  //         activeTintColor: "royalblue",
  //         inactiveTintColor: "gray",
  //       }}
  //     >
  //       <Tab.Screen name="Home" component={HomeScreen} />
  //       <Tab.Screen name="Map" component={MapScreen} />
  //       <Tab.Screen name="Camera" component={CameraScreen} />
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // );
  return null;
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "#DDDDDD",
//     padding: 10,
//   },
//   countContainer: {
//     alignItems: "center",
//     padding: 10,
//   },
//   countText: {
//     color: "#FF00FF",
//   },
// });
