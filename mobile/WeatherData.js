import React, {useState, useEffect} from 'react';
import {useIp} from './IpContext';
import axios from 'axios';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';
import Widget from './Widget';

export default function WeatherData() {
  const ip = useIp();
  const [apiData, setApiData] = useState(null);
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
  return isLoading ? (
    <ActivityIndicator size="large" color="#3182ce" />
  ) : (
    <>
      <View style={styles.container}>
        <Text style={styles.city}>
          {apiData.name}, {apiData.country}
        </Text>
        <Text style={styles.description}>{apiData.description}</Text>
        <View style={styles.mainData}>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${apiData.icon}@2x.png`,
              width: 100,
              height: 100,
            }}
          />
          <View style={styles.tempAndHum}>
            <Text style={styles.temp}>{apiData.temp} °C</Text>
            <Text style={styles.hum}>{apiData.humidity} %</Text>
          </View>
        </View>
      </View>
      <View style={styles.widgets}>
        <Widget width={1} title="Veter" data={`${apiData.wind} km/h`} />
        <Widget width={2} title="Čas meritve" data={`${apiData.time}`} />
        <Widget width={1} title="Pritisk" data={`${apiData.pressure} bar`} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '40%',
    margin: 5,
    backgroundColor: 'white',
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
  city: {
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    color: 'gray',
    textAlign: 'center',
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
  },
  hum: {
    color: 'gray',
    textAlign: 'center',
  },
  widgets: {
    height: '15%',
    margin: 5,
    flexDirection: 'row',
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
