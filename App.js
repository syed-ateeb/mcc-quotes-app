import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, View } from 'react-native';
import BottomNavigator from './navigation/BottomNavigator';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider } from 'react-native-appearance';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import AuthScreen from './screens/AuthScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status: mls } = await MediaLibrary.requestPermissionsAsync();
      const { status: ls } = await Location.requestForegroundPermissionsAsync();

      if ([mls, ls].includes('denied')) {
        Alert.alert(
          'Permissions required',
          'Please enable permissions for the app to work properly'
        );
      }
    })();
  }, []);

  return (
    <AppearanceProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{ headerShown: false }}
              name="auth"
              component={AuthScreen}
            />
            <Stack.Screen name="bottom-nav" component={BottomNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppearanceProvider>
  );
}
