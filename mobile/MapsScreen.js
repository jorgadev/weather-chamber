import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import Navbar from './Navbar';
import SettingsModal from './SettingsModal';
import CityInput from './CityInput';
import MapContainer from './MapContainer';

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
      <MapContainer />
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
