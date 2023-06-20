import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import axios from 'axios';


import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import batista from '../assets/batista.png'
import presbiteriana from '../assets/presbiteriana.png'
import { Card } from '../components/card';
import { StatusBar } from 'expo-status-bar';
import { Persona } from '../components/persona';
import { PastorData } from '../constants/data';
import { Destaques } from '../components/destaques';
import { fetchData } from '../constants/fetchData';


export function Home({navigation}){
  const [searchText, setSearchText] = useState('');
  const [filteredPersonas, setFilteredPersonas] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPastors();
  }, []);

  const fetchPastors = async () => {
    const parsedData = await fetchData();
    setData(parsedData);
  };

  

  const handleSearch = (text) => {
    setSearchText(text);
  
    if (text === '') {
      setFilteredPersonas(data);
    } else {
      const filteredData = data.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.ministerio.toLowerCase().includes(text.toLowerCase()) ||
          item.cargo.toLowerCase().includes(text.toLowerCase())
      );
  
      setFilteredPersonas(filteredData);
    }
  };  

  


  return (
    <SafeAreaView style={{marginTop:38, backgroundColor: '#ffffff'}}>
        <StatusBar backgroundColor='#ffffff' style='dark'/>
        <View style={{marginTop: 20,marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View  style={{height: 60, width: 60, borderRadius: 30, backgroundColor: '#3a5ec2', alignItems: 'center', justifyContent: 'center'}}>
                <Feather name="user" size={30} color="white" />
            </View>
            <Text style={{top: 20, right:90}}>Seja Bem Vindo!</Text>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', right: 20}}>
                <Ionicons name="ios-notifications-outline" size={30} color="black"/>
            </TouchableOpacity>
        </View>

        <View style={{height: 60, width: '90%', left: 22, marginTop: 25, alignItems:'center', justifyContent: 'space-between', borderWidth: 0.5, borderColor: 'gray', borderRadius: 15, flexDirection: 'row'}}>
            <TextInput placeholder='Digite a igreja ou o pregador...' style={{width: '80%', left: 15}} value={searchText} onChangeText={handleSearch}/>
            <TouchableOpacity style={{right: 20}}>
                <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>


        <Card />

   
        <Persona data={searchText === '' ? data : filteredPersonas} />


    </SafeAreaView>
  );
}