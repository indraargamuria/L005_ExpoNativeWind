import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Call from './components/Call';
import Chat from './components/Chat';
import Status from './components/Status';

export type RootTabParamList = {
  Chat: undefined;
  Status: undefined;
  Call: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1e293b' },
          tabBarActiveTintColor: '#38bdf8',
          tabBarInactiveTintColor: '#94a3b8',
        }}
      >
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Status" component={Status} />
        <Tab.Screen name="Call" component={Call} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
