import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

export function Destaques({ pastores }) {
  const destaques = pastores.filter((pastor) => pastor.destaque);
  const navigation = useNavigation()


  const renderItem = ({ item }) => {
    if (item.cargo.toLowerCase() === 'cargo' && item.name.toLowerCase() === 'name' ) {
      return null; // Ignorar o item com os valores "cargo, name, ministerio"
    }

    const renderImage = (photo) => {
      if (photo.startsWith('http://') || photo.startsWith('https://')) {
        return <Image source={{ uri: photo }} style={{
          backgroundColor: '#3a5ec2',
          width: 100,
          height: 100,
          borderRadius: 20,
          marginTop: 10,
        }} />;
      } else {
        return <View  style={{
          backgroundColor: '#3a5ec2',
          width: 100,
          height: 100,
          borderRadius: 20,
          marginTop: 10,
        }} />
      }
    };

   return( <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }} onPress={() => navigation.navigate('Details', {
        name: item.name,
        cargo: item.cargo,
        ministerio: item.ministerio,
        photo: item.photo,
        number: item.number
    })}>
       {renderImage(item.photo)}
      <Text style={{fontWeight: 'bold'}}>{item.cargo}</Text>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
 }

  return (
    <View>
      {destaques.length > 0 ? (
        <>
        <Text style={{left: 20, fontSize: 15, fontWeight: 'bold'}}>Destaques da Semana</Text>
        
          <FlatList
            data={destaques}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      ) : null}
    </View>
  );
}
