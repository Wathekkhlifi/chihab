import React, {useState, useEffect} from 'react';
import {
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styled} from 'nativewind';
import {saveAsCSV} from '../utils/csvHelper';

const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const menu = [
  {id: '1', name: 'Sandwich Thon', price: 4000},
  {id: '2', name: 'Sandwich Kefteji', price: 3500},
  {id: '3', name: 'Sandwich Merguez', price: 5000},
  {id: '4', name: 'Sandwich Escalope', price: 6000},
  {id: '5', name: 'Brick Thon', price: 2000},
  {id: '6', name: 'Brick Thon Fromage', price: 2500},
  {id: '7', name: 'Plat Tunisien', price: 5000},
  {id: '8', name: 'Plat Kefteji', price: 4500},
  {id: '9', name: 'Plat Poisson Grillé', price: 10000},
  {id: '10', name: 'Plat Poulet Grillé', price: 8500},
  {id: '11', name: 'Plat Escalope Grillé', price: 8000},
  {id: '12', name: 'Plat Escalope Panée', price: 9000},
  {id: '13', name: 'Plat Merguez', price: 7000},
  {id: '14', name: 'Ojia Escalope', price: 8000},
  {id: '15', name: 'Ojia Merguez', price: 7000},
  {id: '16', name: 'Ojia Chevrette', price: 10000},
  {id: '17', name: 'Ojia Mixte', price: 12000},
];

const WaiterScreen = ({navigation}: any) => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const storedOrders = await AsyncStorage.getItem('orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    };
    loadOrders();
  }, []);

  const addOrder = async (item: any) => {
    const newOrder = {...item, status: 'pending'};
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const viewDetails = (order: any) => {
    navigation.navigate('OrderDetails', {order});
  };

  const exportOrders = () => {
    saveAsCSV(orders);
  };

  const calculateTotal = () => {
    return orders.reduce((total, order) => total + order.price, 0);
  };

  return (
    <StyledScrollView className="flex-1 p-4">
      <StyledText className="text-2xl mb-4">Menu</StyledText>
      {menu.map(item => (
        <StyledTouchableOpacity
          key={item.id}
          onPress={() => addOrder(item)}
          className="mb-4">
          <StyledText className="text-lg">
            {item.name} - {item.price} TND
          </StyledText>
        </StyledTouchableOpacity>
      ))}
      <Button title="Export Orders to CSV" onPress={exportOrders} />
      <StyledText className="text-2xl mt-4 mb-4">Orders</StyledText>
      <StyledText className="text-lg mt-4">
        Total: {calculateTotal()} TND
      </StyledText>
      <FlatList
        data={orders}
        keyExtractor={item => item.id + Math.random().toString()}
        renderItem={({item}) => (
          <StyledTouchableOpacity
            onPress={() => viewDetails(item)}
            className="mb-4">
            <StyledText className="text-lg">
              {item.name} - {item.price} TND
            </StyledText>
          </StyledTouchableOpacity>
        )}
      />
    </StyledScrollView>
  );
};

export default WaiterScreen;
