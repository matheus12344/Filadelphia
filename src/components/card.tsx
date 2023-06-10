import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native';
import { SimpleLineIcons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
    { key: '1', icon: 'fire', text: 'Pentecostais' },
    { key: '2', icon: require('../assets/presbiteriana.png'), text: 'Presbiterianos' },
    { key: '3', icon: require('../assets/batista.png'), text: 'Batistas' },
    { key: '4', icon: 'cross', text: "Church's" }
  ];

export const Card = () => {
  const [clickedItemKey, setClickedItemKey] = useState(null);

  const handleClick = (key) => {
    setClickedItemKey(prevKey => prevKey === key ? null : key);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ alignItems: 'center', padding: 15 }}
      onPress={() => handleClick(item.key)}
    >
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: item.key === clickedItemKey ? '#3a5ec2' : '#ffffff',
      }}>
        {item.icon == 'fire' ? (
            <SimpleLineIcons
                name={item.icon}
                size={30}
                color={item.key === clickedItemKey ? 'white' : 'black'}
            />
            ) : item.icon == 'cross' ? (
                <MaterialCommunityIcons name="cross" size={24} color={item.key === clickedItemKey ? 'white' : 'black'} />
            ) : (
            <Image
                source={item.icon}
                style={{ width: 30, height: 30, resizeMode: 'contain', tintColor: item.key === clickedItemKey ? 'white' : 'black'}}
            />
        )}

      </View>
      <Text style={{ fontSize: 11, color:'black' }}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 30, flexDirection: 'row' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
