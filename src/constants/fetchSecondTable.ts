import axios from 'axios';

export const fetchSecondTable = async () => {
  try {
    const response = await axios.get(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTgly7shTc5-1NWdvyJMPz3QkEATxY2GE6PTOYyzzdQ4-Chy-iPd93a9CiGDmNjyHlIMizQsg69VNF0/pubhtml'
    );

    const html = response.data;
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);

    const rows = $('table tr').toArray()
    const parsedData = [];
    let skipFirstRow = true;

    rows.forEach((row) => {
      const columns = $(row).find('td').toArray();
      const rowData = {
        id: $(columns[0]).text(),
        nome: $(columns[1]).text(),
        agenda: $(columns[2]).text(),
        location: $(columns[3]).text(),
      };

      if (skipFirstRow) {
        skipFirstRow = false;
        return;
      }

      parsedData.push(rowData);
    });

    return parsedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
