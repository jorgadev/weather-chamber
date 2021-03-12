import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

export default function SliderGroup({
  title,
  min,
  max,
  temperature,
  setTemperature,
  humidity,
  setHumidity,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueAndSlider}>
        <Text style={styles.value}>
          {title == 'Temperatura'
            ? parseInt(temperature).toFixed(0).toString()
            : parseInt(humidity).toFixed(0).toString()}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          value={title == 'Temperatura' ? temperature : humidity}
          minimumTrackTintColor="#3182ce"
          maximumTrackTintColor="#000000"
          thumbTintColor="#3182ce"
          onValueChange={(newValue) =>
            title == 'Temperatura'
              ? setTemperature(newValue)
              : setHumidity(newValue)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  valueAndSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 10,
  },
});
