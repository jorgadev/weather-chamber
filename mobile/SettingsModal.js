import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import SliderGroup from './SliderGroup';
import {SegmentedControls} from 'react-native-radio-buttons';
import axios from 'axios';
import {useIp} from './IpContext';

export default function SettingsModal({
  isModalVisible,
  setIsModalVisible,
  setDataFetchAction,
}) {
  const [selectedOption, setSelectedOption] = useState('Sonce');
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const options = ['Sonce', 'Dež', 'Megla'];
  const ip = useIp();

  // Choose description which will be inserted in database
  const chooseDescription = (optionSelected) => {
    if (optionSelected == 'Sonce') {
      return 'clear sky';
    } else if (optionSelected == 'Dež') {
      return 'rain';
    } else if (optionSelected == 'Megla') {
      return 'mist';
    }
  };

  // Insert custom object
  const insertCustom = () => {
    const descriptionToInsert = chooseDescription(selectedOption);
    const today = new Date();
    const url = `http://${ip}/custom`;
    const customObj = {
      name: 'Po meri',
      country: 'PP',
      coord: {lon: 14.95732766344636, lat: 46.54156930499647},
      temp: parseInt(temperature),
      humidity: parseInt(humidity),
      pressure: 0,
      wind: 0,
      description: descriptionToInsert,
      icon: '01n',
      time: `${today.getHours()}:${today.getMinutes()}`,
    };

    // Make fetch request to custom
    axios
      .post(`${url}/${JSON.stringify(customObj)}`)
      .then(() => {
        setDataFetchAction((prev) => !prev);
        setIsModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View style={styles.container}>
        <SliderGroup
          title="Temperatura"
          min={-10}
          max={30}
          temperature={temperature}
          setTemperature={setTemperature}
          humidity={humidity}
          setHumidity={setHumidity}
        />
        <SliderGroup
          title="Vlaga"
          min={0}
          max={99}
          temperature={temperature}
          setTemperature={setTemperature}
          humidity={humidity}
          setHumidity={setHumidity}
        />
        <View style={styles.options}>
          <Text style={styles.title}>Vreme</Text>
          <SegmentedControls
            options={options}
            selectedOption={selectedOption}
            onSelection={(selection) => {
              setSelectedOption(selection);
              chooseDescription();
            }}
          />
        </View>
        <Button title="SHRANI" color="#3182ce" onPress={insertCustom} />
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
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  options: {
    marginBottom: 50,
  },
});
