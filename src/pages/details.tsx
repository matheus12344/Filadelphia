import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, Linking, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { fetchSecondTable } from '../constants/fetchSecondTable';

export function Details({ navigation }) {
  const route = useRoute();
  const [agenda, setAgenda] = useState([]);
  const { name, cargo, ministerio, photo, number } = route.params;

  useEffect(() => {
    fetchAgenda();
  }, []);

  const fetchAgenda = async () => {
    const parsedData = await fetchSecondTable();
    const filteredData = parsedData.filter((item) => item.nome === name);
    setAgenda(filteredData);
  };

  const renderImage = (photo) => {
    if (photo.startsWith('http://') || photo.startsWith('https://')) {
      return <Image source={{ uri: photo }} style={{ backgroundColor: '#3a5ec2', width: '95%', height: 400, borderRadius: 20 }} />;
    } else {
      return <View style={{ backgroundColor: '#3a5ec2', width: '95%', height: 400, borderRadius: 20 }} />;
    }
  };

  const handleWhatsappPress = () => {
    const url = `https://wa.me/${number}`;
    Linking.openURL(url);
    console.log('você acessou esse pregador');
  };

   // Configurando as localizações e formatos do calendário
   LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje',
  };
  LocaleConfig.defaultLocale = 'pt-br';

  // Função para marcar os dias agendados no calendário
  const markedDates = {};
  agenda.forEach(item => {
    const date = item.agenda.split(' ')[0]; // Supondo que a agenda é uma string no formato "2023-06-15 Hora da reunião"
    markedDates[date] = { selected: true, marked: true, selectedColor: '#3a5ec2' };
  });

 const calendarStyle = {
  dot: {
    backgroundColor: '#3a5ec2',
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 2,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
};

  return (
    <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <View style={{ marginTop: 50, marginLeft: 20 }}>
        {renderImage(photo)}
        <TouchableOpacity
          style={{ height: 50, width: 50, borderRadius: 30, backgroundColor: '#3a5ec2', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 10, left: -17 }}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{ color: 'gray', fontStyle: 'italic' }}>{cargo}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ fontWeight: '400', fontSize: 15 }}>{ministerio}</Text>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Agendas Marcadas</Text>
        </View>
        {agenda.length > 0 ? (
          <View>
            
            <FlatList
              data={agenda}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
                  <Text>{item.agenda}</Text>
                  <Text>{item.location}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <Calendar
                  markedDates={markedDates}
                  markingType="multi-dot"
                  theme={{
                    dotColor: '#3a5ec2',
                    selectedDayBackgroundColor: '#3a5ec2',
                    todayTextColor: '#3a5ec2',
                    arrowColor: '#3a5ec2',
                    monthTextColor: '#3a5ec2',
                  }}
                  renderDotContent={(dotColor) => <View style={[calendarStyle.dot, { backgroundColor: dotColor }]} />}
                  renderDayText={(day) => (
                    <Text style={[calendarStyle.text, { color: markedDates[day.dateString] ? 'white' : 'black' }]}>{day.day}</Text>
                  )}
                />
              )}
              contentContainerStyle={{ paddingBottom: 1200 }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => (
                <TouchableOpacity
          style={{
            height: 80,
            width: 300,
            backgroundColor: '#3a5ec2',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            top: 10,
            left: 38,
            flexDirection: 'row',
          }}
          onPress={handleWhatsappPress}
        >
          <FontAwesome5 name="whatsapp" size={30} color="white" style={{ marginRight: 20 }} />
          <Text style={{ color: 'white' }}>Agendar pelo Whatsapp</Text>
        </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <>
          <View style={{ alignItems: 'center', paddingVertical: 30, marginTop: 10 }}>
            <Text style={{ color: 'gray', fontStyle: 'italic' }}>Nenhuma Agenda no momento!</Text>
          </View>
          <TouchableOpacity
          style={{
            height: 80,
            width: 300,
            backgroundColor: '#3a5ec2',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            top: 10,
            left: 38,
            flexDirection: 'row',
          }}
          onPress={handleWhatsappPress}
        >
          <FontAwesome5 name="whatsapp" size={30} color="white" style={{ marginRight: 20 }} />
          <Text style={{ color: 'white' }}>Agendar pelo Whatsapp</Text>
        </TouchableOpacity>
          </>
          
        )}
        
      </View>
    </SafeAreaView>
  );
}
