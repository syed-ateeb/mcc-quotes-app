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
import { auth } from '../services/firebase';
import {
  init,
  loadFromCloud,
  loadFromLocalStorage,
  saveToCloud,
  saveToLocalStorage,
} from '../services/storage';

function SavedQuoteScreen() {
  const [quotes, setQuotes] = useState([]);

  const handleOnPress = async index => {
    Alert.alert('Trying to save data', 'Please enter your choice', [
      {
        text: 'Cloud',
        onPress: async () => await saveToCloud([quotes[index]]),
      },
      {
        text: 'Local',
        onPress: async () => await saveToLocalStorage([quotes[index]]),
      },
    ]);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.mainView}>
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
        <PressableButton
          onPress={async () => {
            const q = await loadFromCloud();
            if (q) {
              setQuotes(q);
            }
          }}
          buttonText="Load saved from cloud"
        />
        <PressableButton
          onPress={async () => {
            const q = await loadFromLocalStorage();
            if (q) {
              setQuotes(q);
            }
          }}
          buttonText="Load saved from local storage"
        />
      </View>
    </ScrollView>
  );
}

export default SavedQuoteScreen;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  textStyle: {
    color: DefaultTheme.colors.card,
    padding: 5,
  },
});
