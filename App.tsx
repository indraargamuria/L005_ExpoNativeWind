// App.tsx
import React, { useState } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Chat from './components/Chat';
import Status from './components/Status';
import PendingPR from './components/PendingPR';
import PendingPO from './components/PendingPO';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import './global.css'; // pastiin path ini sesuai struktur kamu

export default function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'pendingPO', title: 'Pending PO' },
    { key: 'pendingPR', title: 'Pending PR' },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'pendingPO':
        return <PendingPO isFocused={index === 0} />;
      case 'pendingPR':
        return <PendingPR />;
      default:
        return null;
    }
  };

  const renderTabBar = () => (
    <View className="flex-row bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {routes.map((route, i) => {
        const isFocused = index === i;
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => setIndex(i)}
            className="flex-1 items-center justify-center py-3"
          >
            <Text className={`text-sm font-medium ${isFocused ? 'text-blue-500' : 'text-gray-500'}`}>
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={true}
        renderTabBar={() => null} // hide default tab bar
      />
      {renderTabBar()}
      <Toast /> {/* <- tambahkan ini */}
    </SafeAreaView>
  );
}
