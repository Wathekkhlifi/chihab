import {Share} from 'react-native';
import {writeFile, readFile, DocumentDirectoryPath} from 'react-native-fs';

const saveAsCSV = async (data: any[]) => {
  const header = 'Name,Price,Status\n';
  const rows = data
    .map(order => `${order.name},${order.price},${order.status}`)
    .join('\n');
  const csvString = header + rows;

  const path = `${DocumentDirectoryPath}/orders.csv`;

  try {
    await writeFile(path, csvString, 'utf8');
    const fileContent = await readFile(path, 'utf8');
    await Share.share({
      message: 'Here are the orders.',
      url: path,
      title: 'Orders CSV',
    });
  } catch (error) {
    console.error(error);
  }
};

export {saveAsCSV};
