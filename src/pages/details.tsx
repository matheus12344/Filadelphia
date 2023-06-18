import { useRoute } from '@react-navigation/native';
import React from 'react';

import {
  View, Text, SafeAreaView, Image
} from 'react-native';


export function Details(){
  const route = useRoute();
  const {name, cargo, ministerio, photo} = route.params
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
        <View style={{marginTop: 50, marginLeft: 20}}>
            <Image source={photo} style={{ backgroundColor: '#3a5ec2', width: '95%', height: 400, borderRadius: 20}}/>
            <Text>{cargo}</Text>
            <Text>{name}</Text>
            <Text>{ministerio}</Text>
        </View>
    </SafeAreaView>
  );
}