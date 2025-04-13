// App.tsx
import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Chat from './components/Chat';
import Status from './components/Status';
import Call from './components/PendingPR';

import './global.css';
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

  return (
    
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      swipeEnabled={true}
    />
  );
}
