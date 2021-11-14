import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

function PressableButton({ onPress, buttonText }) {
  return (
    <Pressable
      style={({ pressed }) => style.pressable(pressed)}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={style.pressableText(pressed)}>{buttonText}</Text>
      )}
    </Pressable>
  );
}

export default PressableButton;

const style = StyleSheet.create({
  pressable: pressed => {
    return {
      backgroundColor: pressed
        ? DefaultTheme.colors.text
        : DefaultTheme.colors.primary,
      borderColor: DefaultTheme.colors.primary,
      borderWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      marginHorizontal: 3,
      marginTop: 5,
    };
  },
  pressableText: pressed => {
    return {
      color: pressed ? DefaultTheme.colors.primary : DefaultTheme.colors.card,
    };
  },
});
