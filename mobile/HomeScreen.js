import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Navbar from './Navbar';
import WeatherData from './WeatherData';
import ChamberData from './ChamberData';
import SettingsModal from './SettingsModal';

export default function HomeScreen() {
  const [dataFetchAction, setDataFetchAction] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Navbar
        setDataFetchAction={setDataFetchAction}
        setIsModalVisible={setIsModalVisible}
      />
      <WeatherData dataFetchAction={dataFetchAction} />
      <ChamberData dataFetchAction={dataFetchAction} />
      <SettingsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
