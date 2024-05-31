import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ChefScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const storedOrders = await AsyncStorage.getItem('orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    };
    loadOrders();
  }, []);

  const markAsReady = async (order: any) => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? {...o, status: 'ready'} : o,
    );
    setOrders(updatedOrders);
    await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <StyledView className="flex-1 p-4">
      <StyledText className="text-2xl mb-4">Chef's Order List</StyledText>
      <FlatList
        data={orders.filter(order => order.status === 'pending')}
        keyExtractor={item => item.id + Math.random().toString()}
        renderItem={({item}) => (
          <StyledView className="mb-4">
            <StyledText className="text-lg">
              {item.name} - {item.price} TND
            </StyledText>
            <Button title="Mark as Ready" onPress={() => markAsReady(item)} />
          </StyledView>
        )}
      />
    </StyledView>
  );
};

export default ChefScreen;
