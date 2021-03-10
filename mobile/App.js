import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";

export default function App() {
  const IP = "http://10.190.1.212:3000";
  const [apiData, setApiData] = useState(null);
  const [chamberData, setChamberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(IP)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        axios
          .get(`${IP}/chamber`)
          .then((response) => {
            setChamberData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            {apiData.name}, {apiData.country}
          </Text>
          <Text>Temperatura: {apiData.temp}</Text>
          <Text>Vlaga: {apiData.humidity}</Text>
          <Text>Veter: {apiData.wind}</Text>
          <Text>Pritisk: {apiData.pressure}</Text>
          <Text>Opis: {apiData.description}</Text>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            Komora
          </Text>
          <Text>Temperatura: {chamberData.temperature}</Text>
          <Text>Vlaga: {chamberData.humidity}</Text>
          <Text>Hlajenje: {chamberData.cooling}</Text>
          <Text>Gretje: {chamberData.heating}</Text>
          <Text>Pumpa: {chamberData.pump}</Text>
          <Text>Ventilator: {chamberData.fan}</Text>
          <Text>Para: {chamberData.steam}</Text>
          <Button onPress={fetchData} title="Refresh" />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
