import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Navbar from './Navbar';
import WeatherData from './WeatherData';
import ChamberData from './ChamberData';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Navbar />
      <WeatherData />
      <ChamberData />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
