import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

export function Destaques({ pastores }) {
  const destaques = pastores.filter((pastor) => pastor.destaque);
  const navigation = useNavigation()


  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 30 }} onPress={() => navigation.navigate('Details', {
        name: item.name,
        cargo: item.cargo,
        ministerio: item.ministerio,
        photo: item.photo
    })}>
      <Image
        source={item.photo}
        style={{
          backgroundColor: '#3a5ec2',
          width: 100,
          height: 100,
          borderRadius: 20,
          marginTop: 10,
        }}
      />
      <Text style={{fontWeight: 'bold'}}>{item.cargo}</Text>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{left: 20, fontSize: 15, fontWeight: 'bold'}}>Destaques da Semana</Text>
      {destaques.length > 0 ? (
        <FlatList
          data={destaques}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={{left: 20, color: 'gray', fontStyle: 'italic'}}>Nenhum destaque disponível</Text>
      )}
    </View>
  );
}
