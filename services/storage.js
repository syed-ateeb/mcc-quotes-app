import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {
  auth,
  saveQuoteToFirebase,
  loadQuotesFromFirebase,
} from '../services/firebase';
import { getQuoteById } from '../services/quoteService';

let fileUri = '';

const init = () => {
  fileUri = `${FileSystem.documentDirectory}${auth.currentUser.email}.txt`;
};

const saveToCloud = async quote => {
  try {
    console.log(quote.id);
    await saveQuoteToFirebase(quote.id);
    Alert.alert('Saved', 'Quotes saved to cloud');
  } catch (e) {
    console.log(e);
    Alert.alert('Could not save', 'Quotes were not saved to cloud');
  }
};

const loadFromCloud = async () => {
  try {
    // move these to screen
    // setLoadingMessage('Loading...');

    const { quote: quotes } = await loadQuotesFromFirebase();

    if (quotes.length === 0) {
      throw new Error('No data saved in cloud');
    }

    const temp = [];
    for (const id of quotes) {
      const { success, data } = await getQuoteById(id);
      if (!success) {
        continue;
      }
      temp.push(data);
    }
    return temp;
  } catch (err) {
    console.log(err);
    Alert.alert('Could not load', 'Quotes were not loaded from cloud');
  }

  // move these to screen
  // setLoadingMessage('');
};

const saveToLocalStorage = async quote => {
  try {
    let quotes = await loadFromLocalStorage();
    if (quotes) {
      quotes.push(quote);
    } else {
      quotes = [quote];
    }

    let data = '';
    for (const q of quotes) {
      data += q.id + ' ';
    }

    await FileSystem.writeAsStringAsync(fileUri, data);
    Alert.alert('Saved', 'Quotes saved to local storage');
  } catch (e) {
    console.log(e);
    Alert.alert('Could not save', 'Quotes were not saved to local storage');
  }
};

const loadFromLocalStorage = async () => {
  try {
    // move these to screen
    // setLoadingMessage('Loading...');

    const quotes = (await FileSystem.readAsStringAsync(fileUri))
      .split(' ')
      .filter(d => d.length !== 0);

    if (quotes.length === 0) {
      throw new Error('No data saved in local storage');
    }

    const temp = [];
    for (const id of quotes) {
      const { success, data } = await getQuoteById(id);
      if (!success) {
        continue;
      }
      temp.push(data);
    }
    return temp;
  } catch (e) {
    console.log(e);
    Alert.alert('Could not load', 'Quotes were not loaded from local storage');
  }
  // move these to screen
  // setLoadingMessage('');
};

export {
  init,
  saveToCloud,
  saveToLocalStorage,
  loadFromCloud,
  loadFromLocalStorage,
};
