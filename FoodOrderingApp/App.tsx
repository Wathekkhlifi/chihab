import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import {styled} from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);

const App = () => {
  return (
    <StyledSafeAreaView className="bg-neutral-300 dark:bg-slate-900 flex-1">
      <StatusBar barStyle="dark-content" />
      <StyledScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-neutral-300 dark:bg-slate-900">
        <StackNavigator />
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default App;
