import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useIp} from './IpContext';
import axios from 'axios';

export default function CityInput() {
  const ip = useIp();
  const [newCity, setNewCity] = useState('');

  const showAlert = () => {
    return newCity
      ? Alert.alert(
          'Dodaj mesto',
          `Mesto bo spremenjeno v '${newCity}'. Želite nadaljevati?`,
          [
            {
              text: 'PREKLIČI',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => changeCity()},
          ],
          {cancelable: false},
        )
      : null;
  };

  const changeCity = () => {
    axios
      .get(`http://${ip}/city/${newCity}`)
      .then(function (response) {
        Alert.alert('Successfuly changed', JSON.stringify(response.data));
      })
      .catch(function (error) {
        Alert.alert('Error', JSON.stringify(error));
      })
      .then(() => {
        setNewCity('');
      });
  };

  return (
    <View>
      <Input
        placeholder="Ime kraja..."
        value={newCity}
        onChangeText={(text) => setNewCity(text)}
      />
      <Button
        title="DODAJ"
        containerStyle={{width: '90%'}}
        onPress={showAlert}
      />
    </View>
  );
}
