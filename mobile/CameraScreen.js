import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
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
        showRefresh={false}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <WebView
          source={{uri: `http://${ip}:9000/javascript_simple.html`}}
          containerStyle={{width: '100%', height: '100%'}}
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
