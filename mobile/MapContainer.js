import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import {useIp} from './IpContext';

export default function MapContainer() {
  const ip = useIp();
  const [mapLatitude, setMapLatitude] = useState(51.5078788);
  const [mapLongitude, setMapLongitude] = useState(-0.0877321);

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
            onPress: () => console.log('Cancel Pressed'),
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
      .get(`http://${ip}/coord/lat=${lat}&lon=${lon}`)
      .then(function (response) {
        Alert.alert('Successfuly changed', JSON.stringify(response.data));
      })
      .catch(function (error) {
        Alert.alert('Error', JSON.stringify(error));
      });
  };

  return (
    <View style={styles.container}>
      <Text>Zemljevid!</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: mapLatitude,
          longitude: mapLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(obj) => changeCoords(obj.nativeEvent.coordinate)}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: mapLatitude,
            longitude: mapLongitude,
          }}></Marker>
      </MapView>
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
