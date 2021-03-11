import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';

export default function SettingsModal({isModalVisible, setIsModalVisible}) {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.heading}>Nastavitve</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <Button title="SHRANI" color="#3182ce" />
        <Button
          title="ZAPRI"
          type="outline"
          onPress={() => setIsModalVisible(false)}
          containerStyle={styles.button}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
  },
});
