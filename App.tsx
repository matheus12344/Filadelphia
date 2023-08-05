import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home} from './src/pages/home';
import { Details } from './src/pages/details';
import { Profile } from './src/pages/profile';
import { Curtidas } from './src/pages/curtidas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }}/> 
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Curtidas" component={Curtidas} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar style="dark" backgroundColor='#ffffff' />
    </NavigationContainer>
  );
}
