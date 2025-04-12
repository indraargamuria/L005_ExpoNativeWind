import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type HomepageProps = {
  title: string;
};

export const Homepage = ({ title }: HomepageProps) => {
  return (
    <View className="flex-1 flex-wrap flex-row">
      {/* Kotak pertama sampai kelima (baris pertama) */}
      <View className="w-1/2 h-1/5 items-center justify-center bg-pink-100">
        <Text className='text-lg font-bold text-gray-800'>Hello Everyone</Text>
      </View>
      <View className="w-1/2 h-1/5 bg-pink-200"></View>
      <View className="w-1/2 h-1/5 bg-pink-300"></View>
      <View className="w-1/2 h-1/5 bg-pink-400"></View>
      <View className="w-1/2 h-1/5 bg-pink-500"></View>

      {/* Kotak keenam sampai kesepuluh (baris kedua) */}
      <View className="w-1/2 h-1/5 bg-pink-100"></View>
      <View className="w-1/2 h-1/5 bg-pink-200"></View>
      <View className="w-1/2 h-1/5 bg-pink-300"></View>
      <View className="w-1/2 h-1/5 bg-pink-400"></View>
      <View className="w-1/2 h-1/5 bg-pink-500"></View>
    </View>
  )
};
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
