// components/PendingPO.tsx
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type Props = {
  isFocused: boolean;
};

const PendingPO = ({ isFocused }: Props) => {
  const [poData, setPoData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPOData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://epicortest01.opexcg.com/epicor00/api/v1/BaqSvc/xAPP01_PendingApprovalPO(EPIC06)/',
        {
          headers: {
            'Authorization': 'Basic ' + btoa('epicor:epicor'),
          },
        }
      );
      const data = response.data.value || [];
      setPoData(data);
      Toast.show({
        type: 'success',
        text1: 'PO Fetched!',
        text2: `Total ${data.length} data loaded 👌`,
        position: 'top',
      });
    } catch (err: any) {
      setError('Error fetching data');
      Toast.show({
        type: 'error',
        text1: 'Fetch Failed',
        text2: 'Check your connection or API credentials.',
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchPOData();
    }
  }, [isFocused]);

  const renderItem = (item: any) => {
    const statusColors: { [key: string]: string } = {
      'Approved': 'bg-green-100 text-green-700',
      'Open': 'bg-yellow-100 text-yellow-700',
      'Pending': 'bg-blue-100 text-blue-700',
    };

    return (
      <View key={item.RowIdent} className="bg-white rounded-lg px-4 py-3 mb-3 shadow-sm border border-gray-100">
        <Text className="text-xl font-semibold text-gray-800">{item.Calculated_PONum}</Text>
        <Text className="text-base text-gray-500">
          {item.Calculated_Purchaser} • {item.Calculated_OrderDate}
        </Text>
        <Text className={`text-xs font-bold ${statusColors[item.Calculated_ApprovalStatus] || 'bg-gray-100 text-gray-700'} px-3 py-1 w-fit mt-2 rounded-full`}>
          {item.Calculated_ApprovalStatus}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <ScrollView className="flex-1">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text className="text-red-500">{error}</Text>
        ) : (
          poData.length > 0 ? poData.map(renderItem) : <Text>No data available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PendingPO;
