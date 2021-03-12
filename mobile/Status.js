import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Status({type, value}) {
  return (
    <View style={styles.status}>
      {value == 0 ? (
        <Ionicons name="close-outline" size={22} color="white" />
      ) : (
        <Ionicons name="checkmark-done-outline" size={22} color="white" />
      )}
      <Text style={styles.type}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    flexDirection: 'row',
  },
  type: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
});
