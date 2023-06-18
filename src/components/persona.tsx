import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

import { PastorData } from '../constants/data';
import { useNavigation } from '@react-navigation/native';
import { Destaques } from './destaques';

export function Persona({data}){
    const navigation = useNavigation()

    const RenderItem = ({item}) => (
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
        onPress={() => navigation.navigate('Details', {
            name: item.name,
            cargo: item.cargo,
            ministerio: item.ministerio,
            photo: item.photo
        })}
      >
        <Image
          source={item.photo}
          style={{
            backgroundColor: '#3a5ec2',
            width: 315,
            height: 200,
            borderRadius: 20,
            marginTop: 10,
            marginLeft: 35,
          }}
        />
        <View style={{ marginLeft: 15, marginTop: 20 }}>
          <Text style={{ color: 'gray' }}>{item.cargo}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{item.ministerio}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 900 }}
          ListHeaderComponent={() => {
            if (data === PastorData) {
              return <Destaques pastores={PastorData} />;
            } else {
              return null;
            }
          }}
        />
      </View>
  )
}
