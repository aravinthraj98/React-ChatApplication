/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ChatScreen from './components/Screens/ChatScreen';
import Conversation from './components/Screens/Conversation';
import Login from './components/Screens/Login';
import firebase, {auth} from './components/database/Firebase';
import SignUp from './components/Screens/SignUp';
import StackNavigator from './components/navigations/StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const App = () => {
  return (
    // <ChatScreen />
    // <Conversation />
    // <Login />
    // <SignUp />
    <SafeAreaProvider>
      <StackNavigator />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
