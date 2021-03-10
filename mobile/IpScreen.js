import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';

export default function IpScreen({setAccess}) {
  const [ip, setIp] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  // Check if ip is valid
  const validateIp = () => {
    setButtonLoading(true);
    axios
      .get(`http://${ip}`)
      .then(function (response) {
        setAccess(true);
      })
      .catch(function (error) {
        Alert.alert('Error', error.message);
      })
      .then(() => {
        setButtonLoading(false);
      });

    return () => axios.CancelToken.source().cancel();
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Server IP..."
        onChangeText={(e) => setIp(e)}
        value={ip}
      />
      <Button
        title="CONNECT"
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
