import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Navbar from './Navbar';
import WeatherData from './WeatherData';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Navbar />
      <WeatherData />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
