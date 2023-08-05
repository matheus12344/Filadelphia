import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Destaques } from './destaques';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


let selectedItem = []

export function Persona({data}){
    const navigation = useNavigation()
    const [heartFilled, setHeartFilled] = useState({});

    const handleHeartPress = async (itemId, itemName, itemCargo, itemMinisterio, itemPhoto) => {
      const isAlreadyFilled = heartFilled[itemId] || false;
    
      setHeartFilled((prevHeartFilled) => ({
        ...prevHeartFilled,
        [itemId]: !isAlreadyFilled,
      }));
    
      const selectedItemIndex = selectedItem.findIndex((item) => item.id === itemId);
    
      if (isAlreadyFilled) {
        // Se o ícone já estiver vermelho, remova o item da lista selectedItems
        if (selectedItemIndex !== -1) {
          selectedItem.splice(selectedItemIndex, 1);
        }
      } else {
        // Se o ícone ainda não estiver vermelho, adicione o item à lista selectedItems
        if (selectedItemIndex === -1) {
          selectedItem.push({
            id: itemId,
            name: itemName,
            cargo: itemCargo,
            ministerio: itemMinisterio,
            photo: itemPhoto,
          });
        }
      }
    
      try {
        const selectedItemsJson = JSON.stringify(selectedItem);
        await AsyncStorage.setItem('selectedItems', selectedItemsJson);
        console.log('Itens selecionados salvos com sucesso.');
      } catch (error) {
        console.error('Erro ao salvar os itens selecionados:', error);
      }
    
      console.log('Selected Items:', selectedItem);
    };
    
    
    useEffect(() => {
      const loadSelectedItems = async () => {
        try {
          // Recupere a string JSON armazenada no AsyncStorage usando a chave 'selectedItems'
          const selectedItemsJson = await AsyncStorage.getItem('selectedItems');
          if (selectedItemsJson) {
            // Faça o parse da string JSON para um array e atualize o estado selectedItem
            selectedItem = JSON.parse(selectedItemsJson);
            console.log('Itens selecionados carregados com sucesso.');
          }
        } catch (error) {
          console.error('Erro ao carregar os itens selecionados:', error);
        }
      };
  
      // Chame a função de carregamento quando o componente é montado
      loadSelectedItems();
    }, []); 
  

    const RenderItem = ({ item }) => {
      if (item.cargo.toLowerCase() === 'cargo' && item.name.toLowerCase() === 'name' && item.ministerio.toLowerCase() === 'ministerio') {
        return null; // Ignorar o item com os valores "cargo, name, ministerio"
      }

      const isHeartFilled = heartFilled[item.id] || false;
      const isSelected = selectedItem.findIndex((selectedItem) => selectedItem.id === item.id) !== -1;

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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <TouchableOpacity style={{left: -30}} onPress={() => handleHeartPress(item.id, item.name, item.cargo, item.ministerio, item.photo)}>
              <Entypo
                name={isHeartFilled || isSelected ? 'heart' : 'heart-outlined'}
                size={40}
                color={isHeartFilled || isSelected ? 'red' : 'black'}
              />
            </TouchableOpacity>
          </View>
          <View style={{top: -15}}>
            <Text>{item.ministerio}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 710 }}
          ListHeaderComponent={() => {
            if (data === data) {
              return <Destaques pastores={data} />;
            } else {
              return null;
            }
          }}
        />
      </View>
  )
}

export { selectedItem}
