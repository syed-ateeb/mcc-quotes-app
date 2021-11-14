import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import {
  commands,
  getAddressString,
  getQuoteOfTheDayString,
} from '../services/chatBotServices';

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const userBot = {
    _id: 2,
    name: 'Ateeb Bot',
  };

  const getResponse = async text => {
    switch (text.toLowerCase().trim()) {
      case '1':
        return `Your address is: ${await getAddressString()}`;
      case 'hi':
      case 'hello':
        return 'Hi!';
      case 'bye':
        return 'Bye!';
      case 'help':
        return commands;
      case '2':
        return `Quote of the day is: ${await getQuoteOfTheDayString()}`;
      default:
        return null;
    }
  };

  const sendBotResponse = async messages => {
    const message = messages[messages.length - 1];

    const messageText = message.text;
    if (message.user._id === 2) {
      return;
    }

    const reply = {
      _id: uuid.v4(),
      text:
        (await getResponse(messageText)) ||
        'Sorry, I do not understand ' + messageText,
      createdAt: Date.now(),
      user: userBot,
    };
    onSend([reply]);
  };

  const onSend = useCallback(messages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    sendBotResponse(messages);
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi! How can I help you?',
        createdAt: new Date(),
        user: userBot,
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
