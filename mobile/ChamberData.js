import React, {useState, useEffect} from 'react';
import {useIp} from './IpContext';
import axios from 'axios';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

export default function ChamberData() {
  const ip = useIp();
  const [chamberData, setChamberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on first load
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data and set the state
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`http://${ip}/chamber`)
      .then(function (response) {
        setChamberData(response.data);
      })
      .catch(function (error) {
        Alert.alert('Error', error.message);
      })
      .then(() => {
        setIsLoading(false);
      });
  };
  return isLoading ? (
    <ActivityIndicator size="large" color="#3182ce" />
  ) : (
    <View style={styles.container}>
      <View style={styles.mainData}>
        <View>
          <Text>testtest</Text>
        </View>
        <View style={styles.tempAndHum}>
          <Text style={styles.temp}>{chamberData.temperature} °C</Text>
          <Text style={styles.hum}>{chamberData.humidity} %</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '34%',
    margin: 5,
    marginTop: 0,
    backgroundColor: '#3182ce',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
  mainData: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tempAndHum: {
    justifyContent: 'center',
  },
  temp: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
  },
  hum: {
    color: 'gray',
    textAlign: 'center',
  },
});
