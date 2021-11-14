import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OthersScreen from '../screens/OthersScreen';
import TabBarIcon from '../components/TabBarIcon';
import ChatScreen from '../screens/ChatScreen';
import QuoteScreen from '../screens/QuoteScreen';
import SavedQuoteScreen from '../screens/SavedQuoteScreen';

const BottomTab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Quotes"
        component={QuoteScreen}
        options={{
          title: 'Quotes',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="book-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Saved Quotes"
        component={SavedQuoteScreen}
        options={{
          title: 'Saved Quotes',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="save-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Others"
        component={OthersScreen}
        options={{
          title: 'Others',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="information-circle-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="md-chatbubble-ellipses-outline"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNavigator;
