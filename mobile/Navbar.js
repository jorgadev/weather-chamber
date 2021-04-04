import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Navbar({
  setDataFetchAction,
  setIsModalVisible,
  showRefresh,
}) {
  return (
    <View
      style={[
        styles.container,
        {justifyContent: showRefresh ? 'space-between' : 'flex-end'},
      ]}>
      {showRefresh && (
        <TouchableOpacity onPress={() => setDataFetchAction((prev) => !prev)}>
          <Ionicons name="refresh-outline" size={35} color="white" />
        </TouchableOpacity>
      )}
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
    alignItems: 'center',
    padding: 10,
  },
});
