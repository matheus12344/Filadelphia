import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://docs.google.com/spreadsheets/u/7/d/e/2PACX-1vTyyydtJrKtGhm8MvW5jqdBVPAAEScubua9P9Vx-_rgWEVNOonOQ5Q_KwAKWXh_7Z-_4XpEusWT4_s5/pubhtml'
    );

    const html = response.data;
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);

    const rows = $('table tr').toArray();
    const parsedData = [];
    let skipFirstRow = true;

    rows.forEach((row) => {
      const columns = $(row).find('td').toArray();
      const rowData = {
        id: $(columns[0]).text(),
        name: $(columns[1]).text(),
        cargo: $(columns[2]).text(),
        ministerio: $(columns[3]).text(),
        categoria: $(columns[4]).text(),
        destaque: $(columns[5]).text(),
        number: $(columns[6]).text(),
        photo: $(columns[7]).text(),
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
