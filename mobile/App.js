import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import MapsScreen from './MapsScreen';
import CameraScreen from './CameraScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Maps" component={MapsScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
