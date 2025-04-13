// App.tsx
import React, { useState } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Chat from './components/Chat';
import Status from './components/Status';
import Call from './components/Call';
import { SafeAreaView } from 'react-native-safe-area-context';

import './global.css'; // pastiin path ini benar

const renderScene = SceneMap({
  chat: Chat,
  status: Status,
  call: Call,
});

export default function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'chat', title: 'Chat' },
    { key: 'status', title: 'Status' },
    { key: 'call', title: 'Call' },
  ]);

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
        renderTabBar={() => null} // kita hide tab default
      />
      {renderTabBar()}
    </SafeAreaView>
  );
}
