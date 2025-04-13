import { View, Text } from 'react-native';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
const Call = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
        <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
            <Text className="text-lg text-gray-900 dark:text-white font-bold">⚙️ Settings Page</Text>
            <Text className="text-gray-600 dark:text-gray-300">Change your preferences here.</Text>
        </View>
    </SafeAreaView>
  );
};

export default Call;
