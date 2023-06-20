import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../credentials/google-sheets-api.json'
// Configurações da planilha
const doc = new GoogleSpreadsheet('1dfeZ3I9VyXpsjshrBKTZsGd3DDyE5shTFPTHvUZBFr4');

async function accessSpreadsheet() {
    try {
      // Autenticação com as credenciais
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo(); // Carrega as informações da planilha
      const sheet = doc.sheetsByIndex[0]; // Acessa a primeira aba da planilha (índice 0)
  
      // Exemplo: Ler dados da planilha
      const rows = await sheet.getRows();
      rows.forEach((row: any) => {
        console.log(row.name, row.cargo, row.ministerio);
      });
  
      // Exemplo: Escrever dados na planilha
      const newRow = {
        name: 'John Doe',
        cargo: 'Pastor',
        ministerio: 'Igreja XYZ'
      };
      await sheet.addRow(newRow);
  
      // Exemplo: Atualizar dados na planilha
      const rowsToUpdate = await sheet.getRows({ offset: 1, limit: 10 }); // Obtém as 10 primeiras linhas (excluindo o cabeçalho)
      rowsToUpdate.forEach((row: any) => {
        row.name = 'Updated Name';
        row.save(); // Salva as alterações na linha
      });
    } catch (error) {
      console.error('Erro ao acessar a planilha:', error);
    }
  }
  
  accessSpreadsheet();