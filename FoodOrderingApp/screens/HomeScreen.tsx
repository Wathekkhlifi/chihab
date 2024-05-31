import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

type RootStackParamList = {
  Home: undefined;
  Waiter: undefined;
  Chef: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <StyledView className="flex-1 justify-center items-center p-4">
      <StyledText className="text-2xl mb-4">Select Role</StyledText>
      <Button title="Waiter" onPress={() => navigation.navigate('Waiter')} />
      <Button title="Chef" onPress={() => navigation.navigate('Chef')} />
    </StyledView>
  );
};

export default HomeScreen;
