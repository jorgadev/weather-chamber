import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {Button} from 'react-native-elements';
import Navbar from './Navbar';
import SettingsModal from './SettingsModal';
import {useIp} from './IpContext';

export default function CameraScreen({setDataFetchAction}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ip = useIp();

  return (
    <>
      <Navbar
        setIsModalVisible={setIsModalVisible}
        setDataFetchAction={setDataFetchAction}
      />
      <View style={styles.container}>
        <WebView
          source={{uri: `http://${ip}:9000/javascript_simple.html`}}
          containerStyle={styles.webview}
        />
        <Button
          title="OSVEŽI"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => setDataFetchAction((prev) => !prev)}
        />
      </View>
      <SettingsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setDataFetchAction={setDataFetchAction}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  webview: {
    flex: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    paddingHorizontal: 20,
  },
});
