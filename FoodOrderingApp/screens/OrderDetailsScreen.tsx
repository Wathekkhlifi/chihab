import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

type RootStackParamList = {
  OrderDetails: {order: any};
};

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

const OrderDetailsScreen = ({route, navigation}: Props) => {
  const {order} = route.params;

  const markAsServed = async () => {
    const storedOrders = await AsyncStorage.getItem('orders');
    let orders = storedOrders ? JSON.parse(storedOrders) : [];
    orders = orders.map((o: any) =>
      o.id === order.id ? {...o, status: 'served'} : o,
    );
    await AsyncStorage.setItem('orders', JSON.stringify(orders));
    navigation.goBack();
  };

  return (
    <StyledView className="flex-1 p-4">
      <StyledText className="text-2xl mb-4">Order Details</StyledText>
      <StyledText className="text-lg mb-2">Name: {order.name}</StyledText>
      <StyledText className="text-lg mb-2">Price: {order.price} TND</StyledText>
      <StyledText className="text-lg mb-2">Status: {order.status}</StyledText>
      {order.status === 'ready' && (
        <Button title="Mark as Served" onPress={markAsServed} />
      )}
    </StyledView>
  );
};

export default OrderDetailsScreen;
