import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {
  isFocused: boolean;
};

const PendingPO = ({ isFocused }: Props) => {
  const [poData, setPoData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPO, setSelectedPO] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState<'Approve' | 'Reject' | null>(null);
  const [open, setOpen] = useState(false); // For controlling dropdown
  const [value, setValue] = useState<string | null>(null); // Selected value
  const [refreshing, setRefreshing] = useState(false); // For controlling pull-to-refresh

  // Fetch PO data
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

  // UseEffect untuk memanggil API ketika komponen di-focus
  useEffect(() => {
    if (isFocused) {
      fetchPOData();
    }
  }, [isFocused]);

  // Fungsi untuk menangani pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPOData();
    setRefreshing(false);
  }, []);

  const renderItem = (item: any) => {
    const statusColors: { [key: string]: string } = {
      'Approved': 'bg-green-100 text-green-700',
      'Open': 'bg-yellow-100 text-yellow-700',
      'Pending': 'bg-blue-100 text-blue-700',
    };

    return (
      <TouchableOpacity
        key={item.RowIdent}
        onPress={() => {
          setSelectedPO(item);
          setModalVisible(true);
        }}
        className="bg-white rounded-lg px-4 py-3 mb-3 shadow-sm border border-gray-100"
      >
        <Text className="text-xl font-semibold text-gray-800">
          {item.Calculated_PONum}
        </Text>
        <Text className="text-base text-gray-500">
          {item.Calculated_Purchaser} • {item.Calculated_OrderDate}
        </Text>
        <Text
          className={`text-xs font-bold ${
            statusColors[item.Calculated_ApprovalStatus] || 'bg-gray-100 text-gray-700'
          } px-3 py-1 w-fit mt-2 rounded-full`}
        >
          {item.Calculated_ApprovalStatus}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text className="text-red-500">{error}</Text>
        ) : poData.length > 0 ? (
          poData.map(renderItem)
        ) : (
          <Text>No data available</Text>
        )}
      </ScrollView>

      {/* Modal */}
      {modalVisible && selectedPO && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 items-center justify-center z-50">
          <View className="bg-white w-[90%] rounded-2xl p-5 shadow-lg">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              PO No.{selectedPO.Calculated_PONum}
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Purchaser: {selectedPO.Calculated_Purchaser}
            </Text>

            {/* Dropdown for Action */}
            <DropDownPicker
              open={open}
              value={value}
              items={[
                { label: 'Approve', value: 'Approve' },
                { label: 'Reject', value: 'Reject' },
              ]}
              setOpen={setOpen}
              setValue={setValue}
              placeholder="Select Action"
              containerStyle={{ marginBottom: 20 }}
              onChangeValue={(val) => setAction(val as 'Approve' | 'Reject')}
            />

            {/* Buttons */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded-lg"
                onPress={() => {
                  if (action) {
                    Toast.show({
                      type: 'success',
                      text1: `${action} submitted!`,
                      text2: `PO #${selectedPO.Calculated_PONum}`,
                      position: 'top',
                    });
                    setModalVisible(false);
                    setAction(null);
                    setValue(null); // Reset dropdown after submit
                  } else {
                    Toast.show({
                      type: 'info',
                      text1: 'No action selected',
                      text2: 'Please choose Approve or Reject',
                      position: 'top',
                    });
                  }
                }}
              >
                <Text className="text-white font-semibold">Process</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onPress={() => {
                  setModalVisible(false);
                  setAction(null);
                  setValue(null); // Reset dropdown when cancelled
                }}
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PendingPO;
