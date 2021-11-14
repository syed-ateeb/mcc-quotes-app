import { DefaultTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import PressableButton from '../components/PressableButton';
import LoadingModal from '../components/LoadingModal';
import { getQuotes } from '../services/quoteService';
import { saveToCloud, saveToLocalStorage } from '../services/storage';

function QuoteScreen(props) {
  const [quotes, setQuotes] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState('');

  const refreshQuotes = async () => {
    setLoadingMessage('Loading...');
    const { success, data } = await getQuotes();

    if (!success) {
      Alert.alert('Could not load quotes', 'Quotes could not be loaded');
      setLoadingMessage('');
      return;
    }

    setQuotes(data.quotes);
    setLoadingMessage('');
  };

  const handleOnPress = index => {
    Alert.alert('Enter your choice', 'Where would you like to save?', [
      { text: 'Cancel' },
      {
        text: 'Cloud',
        onPress: () => saveToCloud(quotes[index]),
      },
      {
        text: 'Local',
        onPress: () => saveToLocalStorage(quotes[index]),
      },
    ]);
  };

  useEffect(() => {
    refreshQuotes();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.mainView}>
        <LoadingModal loadingMessage={loadingMessage} />
        {quotes.map((q, i) => (
          <Pressable
            onPress={() => handleOnPress(i)}
            key={q.id}
            style={{
              paddingVertical: 20,
              paddingHorizontal: 5,
              borderWidth: 1,
              borderColor: 'grey',
            }}
          >
            <Text style={{ color: 'white' }}>
              {i + 1} - Author: {q.author}
            </Text>
            <Text style={{ color: 'white' }}>Quote: {q.body}</Text>
          </Pressable>
        ))}
        <PressableButton onPress={refreshQuotes} buttonText="Refresh Quotes" />
      </View>
    </ScrollView>
  );
}

export default QuoteScreen;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  textStyle: {
    color: DefaultTheme.colors.card,
    padding: 5,
  },
});
