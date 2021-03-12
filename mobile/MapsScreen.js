import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useIp} from './IpContext';
import axios from 'axios';

export default function MapsScreen() {
  const ip = useIp();
  const [newCity, setNewCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = () => {
    return newCity
      ? Alert.alert(
          'Add City',
          `City will be changed to '${newCity}'. Are you sure?`,
          [
            {
              text: 'Cancel',
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
    setIsLoading(true);
    axios
      .get(`http://${ip}/city/${newCity}`)
      .then(function (response) {
        Alert.alert('Successfuly changed', JSON.stringify(response.data));
      })
      .catch(function (error) {
        Alert.alert('Error', JSON.stringify(error));
      })
      .then(() => {
        setIsLoading(false);
        setNewCity('');
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      {isLoading && Alert.alert('Loading')}
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
