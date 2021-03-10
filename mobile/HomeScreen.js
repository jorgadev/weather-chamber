import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {useIp} from './IpContext';
import axios from 'axios';

export default function HomeScreen() {
  const ip = useIp();
  const [apiData, setApiData] = useState(null);
  const [chamberData, setChamberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`http://${ip}`)
      .then(function (response) {
        setApiData(response.data);
      })
      .catch(function (error) {
        Alert.alert('Error', error.message);
      })
      .then(() => {
        axios
          .get(`http://${ip}/chamber`)
          .then(function (response) {
            setChamberData(response.data);
            setIsLoading(false);
          })
          .catch(function (error) {
            Alert.alert('Error', error.message);
          });
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <Text>Loading..</Text>
      ) : (
        <View>
          <Text style={{fontWeight: 'bold'}}>API </Text>
          <Text>Name: {apiData.name}</Text>
          <Text>Country: {apiData.country}</Text>
          <Text>Temperature: {apiData.temp}</Text>
          <Text>Humidity: {apiData.humidity}</Text>
          <Text>Description: {apiData.description}</Text>
          <Text>-------------------------</Text>
          <Text style={{fontWeight: 'bold'}}>CHAMBER </Text>
          <Text>Temperature: {chamberData.temperature}</Text>
          <Text>Humidity: {chamberData.humidity}</Text>
          <Text>Cooling: {chamberData.cooling}</Text>
          <Text>Heating: {chamberData.heating}</Text>
          <Text>Fan: {chamberData.fan}</Text>
          <Text>Pump: {chamberData.pump}</Text>
          <Text>Steam: {chamberData.steam}</Text>
          <Text>-------------------------</Text>
          <Button title="REFRESH" onPress={fetchData} />
        </View>
      )}
    </View>
  );
}
