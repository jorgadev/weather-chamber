import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';
import {useIp, useUpdateIp} from './IpContext';

export default function IpScreen({setAccess}) {
  const ip = useIp();
  const updateIp = useUpdateIp();
  const [buttonLoading, setButtonLoading] = useState(false);

  // Check if ip is valid
  const validateIp = () => {
    let timer = setTimeout(() => {
      Alert.alert('Napaka', 'Ip neveljaven');
      setButtonLoading(false);
    }, 5000);
    setButtonLoading(true);
    axios
      .get(`http://${ip}`)
      .then(function (response) {
        setAccess(true);
      })
      .catch(function (error) {
        Alert.alert('Napaka', JSON.stringify(error));
      })
      .then(() => {
        clearTimeout(timer);
        setButtonLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Server IP..."
        onChangeText={(text) => {
          setButtonLoading(false);
          updateIp(text);
        }}
        value={ip}
      />
      <Button
        title="POVEŽI"
        containerStyle={styles.button}
        onPress={validateIp}
        loading={buttonLoading}
        disabeld={buttonLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    width: '90%',
  },
});
