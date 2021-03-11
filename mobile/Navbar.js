import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Navbar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3182ce',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
});
