import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

type HomepageProps = {
  title: string;
};

export const Homepage = ({ title }: HomepageProps) => {
  const [activeTab, setActiveTab] = useState<'PO' | 'PR'>('PO');
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
            'Authorization': 'Basic ' + btoa('epicor:epicor') // ganti username dan password dengan yang sesuai
          }
        }
      );

      // Mengakses properti 'value' untuk mendapatkan array PO
      const data = response.data.value || [];
      setPoData(data);
    } catch (err: any) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'PO') {
      fetchPOData();
    }
  }, [activeTab]);

  const renderTab = (label: 'PO' | 'PR') => (
    <TouchableOpacity
      className={`px-4 py-2 border-b-2 ${activeTab === label ? 'border-blue-600' : 'border-transparent'}`}
      onPress={() => setActiveTab(label)}
    >
      <Text className={`text-lg font-semibold ${activeTab === label ? 'text-blue-600' : 'text-gray-500'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
        <Text className={`text-lg font-bold ${statusColors[item.Calculated_ApprovalStatus] || 'bg-gray-100 text-gray-700'} px-3 py-1 w-fit mt-2 rounded-full`}>
          {item.Calculated_ApprovalStatus}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-3">Pending Approval</Text>

      <View className="flex-row mb-4">
        {renderTab('PO')}
        {renderTab('PR')}
      </View>

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
