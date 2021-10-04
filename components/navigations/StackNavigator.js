import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Conversation from '../Screens/Conversation';
import ChatScreen from '../Screens/ChatScreen';
const Stack = createNativeStackNavigator();

function StackNavigator() {
  const [loggedIn, setLogged] = useState(null);
  function setLogin(email) {
    setLogged(email);
  }

  return (
    <NavigationContainer>
      {loggedIn == null ? (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {props => <Login SetLog={setLogin} {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {props => <SignUp {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Conversations" options={{headerShown: false}}>
            {props => <Conversation {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default StackNavigator;
