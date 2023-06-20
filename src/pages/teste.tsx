import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList } from 'react-native';

function Teste() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://docs.google.com/spreadsheets/u/7/d/e/2PACX-1vTyyydtJrKtGhm8MvW5jqdBVPAAEScubua9P9Vx-_rgWEVNOonOQ5Q_KwAKWXh_7Z-_4XpEusWT4_s5/pubhtml'
      );

      const html = response.data;
      const cheerio = require('cheerio');
      const $ = cheerio.load(html);

      const rows = $('table tr').toArray();
      const parsedData = rows.map((row, index) => {
        if (index === 0) {
          // Ignore the header row
          return null;
        }

        const columns = $(row).find('td').toArray();
        return {
          id: $(columns[0]).text(),
          name: $(columns[1]).text(),
          cargo: $(columns[2]).text(),
          ministerio: $(columns[3]).text(),
          categoria: $(columns[4]).text(),
          photo: $(columns[5]).text(),
          destaque: $(columns[6]).text() === 'TRUE',
          number: $(columns[7]).text(),
        };
      });

      // Remove the null values (header row)
      const filteredData = parsedData.filter(item => item !== null);

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      <Text>Data from Google Sheets</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

export default Teste;
