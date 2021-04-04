import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import {useIp} from './IpContext';

export default function MapContainer({setDataFetchAction}) {
  const ip = useIp();
  const [mapLatitude, setMapLatitude] = useState(null);
  const [mapLongitude, setMapLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on first load
  useEffect(() => {
    // Fetch data and set the state
    axios
      .get(`http://${ip}:3000`)
      .then(function (response) {
        setMapLatitude(response.data.coord.lat);
        setMapLongitude(response.data.coord.lon);
      })
      .catch(function (error) {
        Alert.alert('Error', error.message);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  // Change coordinates of marker and mapview
  const changeCoords = (coords) => {
    if (coords) {
      setMapLatitude(coords.latitude);
      setMapLongitude(coords.longitude);
      Alert.alert(
        'Dodaj mesto',
        `Novi koordinati bosta '${coords.latitude}, ${coords.longitude}'. Želite nadaljevati?`,
        [
          {
            text: 'PREKLIČI',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => changeCity(coords.latitude, coords.longitude),
          },
        ],
        {cancelable: false},
      );
    }
  };

  // Change city in api
  const changeCity = (lat, lon) => {
    axios
      .get(`http://${ip}:3000/coord/lat=${lat}&lon=${lon}`)
      .then(function (response) {
        setDataFetchAction((prev) => !prev);
        Alert.alert(
          'Sprememba mesta',
          `Trenutno mesto je ${JSON.stringify(response.data.name)}`,
        );
      })
      .catch(function (error) {
        Alert.alert('Napaka', JSON.stringify(error));
      });
  };

  return (
    <View style={styles.container}>
      {mapLatitude && mapLongitude ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: mapLatitude,
            longitude: mapLongitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          onPress={(obj) => changeCoords(obj.nativeEvent.coordinate)}
          style={styles.map}>
          <Marker
            coordinate={{
              latitude: mapLatitude,
              longitude: mapLongitude,
            }}></Marker>
        </MapView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
