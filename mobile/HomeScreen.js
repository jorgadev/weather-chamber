import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Navbar from './Navbar';
import WeatherData from './WeatherData';
import ChamberData from './ChamberData';

export default function HomeScreen() {
  const [dataFetchAction, setDataFetchAction] = useState(false);

  return (
    <View style={styles.container}>
      <Navbar setDataFetchAction={setDataFetchAction} />
      <WeatherData dataFetchAction={dataFetchAction} />
      <ChamberData dataFetchAction={dataFetchAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
