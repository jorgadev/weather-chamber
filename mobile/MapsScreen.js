import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import Navbar from './Navbar';
import SettingsModal from './SettingsModal';
import CityInput from './CityInput';

export default function MapsScreen() {
  const [dataFetchAction, setDataFetchAction] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Navbar
        setDataFetchAction={setDataFetchAction}
        setIsModalVisible={setIsModalVisible}
        showRefresh={false}
      />
      <CityInput />
      <SettingsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
