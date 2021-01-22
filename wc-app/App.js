import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { SearchBar, Button } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

// server ip address
const ip = "http://192.168.64.102:3000/";

// home screen
function HomeScreen({ navigation }) {
  const [name, setName] = useState("CITY");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetch(ip)
        .then((response) => response.json())
        .then((json) => {
          setName(json.name);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        marginTop: 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{name}</Text>
    </View>
  );
}

// map screen
function MapScreen({ navigation }) {
  const [search, changeSearch] = useState("");
  const [lat, changeLat] = useState(46.54489);
  const [lon, changeLon] = useState(14.95645);
  let cityName;

  return (
    <View style={{ flex: 1, marginTop: 24 }}>
      <SearchBar
        placeholder="Type Here.."
        platform="android"
        onChangeText={changeSearch}
        value={search}
      />
      <Button
        title="Change"
        onPress={() => {
          if (search != "") {
            cityName = search;
            fetch(ip + "city/" + cityName)
              .then((response) => response.json())
              .then((json) => {
                Alert.alert(
                  "Change city",
                  'Do you really want to change city to "' + cityName + '" ?',
                  [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        if (json.cod == 200) {
                          changeLat(json.coord.lat);
                          changeLon(json.coord.lon);
                          navigation.navigate("Home");
                        } else {
                          Alert.alert(
                            "Invalid name",
                            "You inserted invalid name",
                            [
                              {
                                text: "OK",
                              },
                            ],
                            { cancelable: false }
                          );
                        }
                      },
                    },
                  ],
                  { cancelable: false }
                );
              });
          }
        }}
      />
      <MapView
        style={{ position: "relative", flex: 1 }}
        initialRegion={{
          latitude: lat,
          longitude: lon,
        }}
        onPress={(e) => {
          changeLat(e.nativeEvent.coordinate.latitude);
          changeLon(e.nativeEvent.coordinate.longitude);
          fetch(
            ip +
              "coord/lat=" +
              e.nativeEvent.coordinate.latitude +
              "&lon=" +
              e.nativeEvent.coordinate.longitude
          )
            .then((response) => response.json())
            .then((json) => {
              if (json.name != "") {
                Alert.alert(
                  "Change city",
                  'Do you really want to change city to "' + json.name + '" ?',
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        if (json.cod == 200) {
                          navigation.navigate("Home");
                        }
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }
            });
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: lon }} />
      </MapView>
    </View>
  );
}

// camera screen
function CameraScreen() {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "ios-locate" : "ios-locate-outline";
            } else if (route.name === "Camera") {
              iconName = focused ? "ios-camera" : "ios-camera-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "royalblue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} style={styles.navLink} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  countText: {
    color: "#FF00FF",
  },
});
