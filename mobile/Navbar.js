import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Button, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

export default function Navbar({setDataFetchAction, setIsModalVisible}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDataFetchAction((prev) => !prev)}>
        <Ionicons name="refresh-outline" size={35} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Ionicons name="settings-outline" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3182ce',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
