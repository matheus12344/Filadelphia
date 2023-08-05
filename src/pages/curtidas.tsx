import React from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { TabBar } from '../components/TabBar';
import {selectedItem} from '../components/persona'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'



export function Curtidas(){
  const navigation = useNavigation()
  const RenderItem = ({ item }) => {
      if (item.cargo.toLowerCase() === 'cargo' && item.name.toLowerCase() === 'name' && item.ministerio.toLowerCase() === 'ministerio') {
        return null; // Ignorar o item com os valores "cargo, name, ministerio"
      }
      const renderImage = (photo) => {
        if (photo.startsWith('http://') || photo.startsWith('https://')) {
          return <Image source={{ uri: photo }} style={{
            backgroundColor: '#3a5ec2',
            width: 315,
            height: 200,
            borderRadius: 20,
            marginTop: 10,
            marginLeft: 35,
          }} />;
        } else {
          return <View style={{
            backgroundColor: '#3a5ec2',
            width: 315,
            height: 200,
            borderRadius: 20,
            marginTop: 10,
            marginLeft: 35,
          }} />;
        }
      };
  
      return (
        <TouchableOpacity
          style={{
            width: '95%',
            height: 350,
            borderWidth: 0.5,
            borderColor: 'gray',
            borderRadius: 20,
            marginLeft: 10,
            marginTop: 30
          }}
          onPress={() =>
            navigation.navigate('Details', {
              name: item.name,
              cargo: item.cargo,
              ministerio: item.ministerio,
              photo: item.photo,
              number: item.number
            })
          }
        >
       {renderImage(item.photo)}
        <View style={{ marginLeft: 15, marginTop: 20 }}>
          <Text style={{ color: 'gray' }}>{item.cargo}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{item.ministerio}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{marginTop: 35}}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={{justifyContent: 'center', alignItems: 'center', top: 15}}>
            <Entypo name={'heart-outlined'} size={45} color={'black'}/>
          </View>
        )}
        data={selectedItem}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <View style={{height:90}}/>
        )}
      />
      <TabBar />
      </View>
    </View>
  );
}