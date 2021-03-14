import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IpProvider from './IpContext';

import IpScreen from './IpScreen';
import HomeScreen from './HomeScreen';
import MapsScreen from './MapsScreen';
import CameraScreen from './CameraScreen';

LogBox.ignoreAllLogs(true);

const Tab = createBottomTabNavigator();

export default function App() {
  const [access, setAccess] = useState(false);
  const [dataFetchAction, setDataFetchAction] = useState(false);

  return (
    <IpProvider>
      <SafeAreaProvider>
        {!access ? (
          <IpScreen setAccess={setAccess} />
        ) : (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;

                  if (route.name === 'Domov') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Zemljevid') {
                    iconName = focused ? 'locate' : 'locate-outline';
                  } else if (route.name === 'Kamera') {
                    iconName = focused ? 'camera' : 'camera-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: '#3182ce',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen
                name="Domov"
                component={() => (
                  <HomeScreen
                    dataFetchAction={dataFetchAction}
                    setDataFetchAction={setDataFetchAction}
                  />
                )}
              />
              <Tab.Screen
                name="Zemljevid"
                component={() => (
                  <MapsScreen setDataFetchAction={setDataFetchAction} />
                )}
              />
              <Tab.Screen name="Kamera" component={CameraScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </IpProvider>
  );
}
