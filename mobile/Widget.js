import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Widget({width, title, data}) {
  return (
    <View
      style={[
        styles.widget,
        width == 2 ? {marginHorizontal: 5} : {marginHorizontal: 0},
      ]}
      flex={width}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    color: 'gray',
  },
  data: {
    textAlign: 'center',
    fontSize: 14,
  },
});
