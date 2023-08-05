import React from 'react';

import {
  View, TouchableOpacity, Linking
} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const handleForms = () => {
  const url = `https://docs.google.com/forms/u/7/d/e/1FAIpQLScYwTuBgR1E8GW_vKWtlim8DWL_ztooSWd4Ayj8M1Ud-UtB_Q/formResponse`;

  Linking.openURL(url);
  console.log("você acessou esse formulário!") 
}

export function TabBar({}){
  const navigation = useNavigation()
  const route = useRoute();

  const isCurtidasPage = route.name === 'Curtidas';
  const heartColor = isCurtidasPage ? '#3a5ec2' : 'black';
  const homeColor = isCurtidasPage? 'black' : '#3a5ec2'
  return (
    <View style={{width: '95%', height: 70, position: 'absolute', top: 750, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center', left: 10, borderColor: '#3a5ec2', borderWidth: 1.5}}>
       <View style={{padding: 30, flexDirection: 'row'}}>
            <TouchableOpacity style={{backgroundColor: 'white', height:50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25, top: 10}} onPress={() => navigation.navigate('Home')}>
                <AntDesign name="home" size={40} color={homeColor} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#3a5ec2', height:75, width: 75, alignItems: 'center', justifyContent: 'center', borderRadius: 25, left: 78, top: -20}} onPress={handleForms}>
                <Ionicons name="ios-add-outline" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'white', height:50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25, left: 155, top: 11}} onPress={() => navigation.navigate('Curtidas')}>
                <Entypo name="heart-outlined" size={40} color={heartColor}/>
            </TouchableOpacity>
       </View>

    </View>
  );
}