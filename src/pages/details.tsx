import { useRoute } from '@react-navigation/native';
import React from 'react';

import {
  View, Text, SafeAreaView, Image
} from 'react-native';


export function Details(){
  const route = useRoute();
  const {name, cargo, ministerio, photo} = route.params

  const renderImage = (photo) => {
    if (photo.startsWith('http://') || photo.startsWith('https://')) {
      return <Image source={{ uri: photo }} style={{ backgroundColor: '#3a5ec2', width: '95%', height: 400, borderRadius: 20}} />;
    } else {
      return <View style={{ backgroundColor: '#3a5ec2', width: '95%', height: 400, borderRadius: 20}} />;
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
        <View style={{marginTop: 50, marginLeft: 20}}>
            {renderImage(photo)}

            <Text>{cargo}</Text>
            <Text>{name}</Text>
            <Text>{ministerio}</Text>
        </View>
    </SafeAreaView>
  );
}