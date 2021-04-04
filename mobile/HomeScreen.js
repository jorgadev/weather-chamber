import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Navbar from './Navbar';
import WeatherData from './WeatherData';
import ChamberData from './ChamberData';
import SettingsModal from './SettingsModal';

export default function HomeScreen({dataFetchAction, setDataFetchAction}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Navbar
        setDataFetchAction={setDataFetchAction}
        setIsModalVisible={setIsModalVisible}
        showRefresh={true}
      />
      <WeatherData dataFetchAction={dataFetchAction} />
      <ChamberData dataFetchAction={dataFetchAction} />
      <SettingsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setDataFetchAction={setDataFetchAction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
