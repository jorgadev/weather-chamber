import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import SliderGroup from './SliderGroup';

export default function SettingsModal({isModalVisible, setIsModalVisible}) {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View style={styles.container}>
        <SliderGroup title="Temperatura" min={-10} max={30} />
        <SliderGroup title="Vlaga" min={0} max={99} />
        <Button title="SHRANI" color="#3182ce" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 30,
  },
  button: {
    marginVertical: 5,
  },
});
