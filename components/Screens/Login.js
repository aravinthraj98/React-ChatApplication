import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Springgreen} from '../services/Color';
import firebase, {auth} from './../database/Firebase';
// rr
function Login() {
  // r
  const initialState = {
    email: '',
    password: '',
  };
  const [login, setLogin] = useState(initialState);
  function handleChange(name, value) {
    setLogin({...login, [name]: value});
  }
  function handleSubmit() {
    console.log(login);
    const ref = firebase
      .auth()
      .signInWithEmailAndPassword(login.email, login.password);
    console.log('signed IN');
    console.log(ref);
  }
  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: Springgreen}}>LOGIN</Text>
      <TextInput
        placeholder={'email'}
        onChangeText={text => handleChange('email', text)}
        style={{
          borderWidth: 2,

          width: '60%',
          borderColor: Springgreen,
          borderRadius: 10,
        }}></TextInput>
      <TextInput
        placeholder={'password'}
        onChangeText={text => handleChange('password', text)}
        style={{
          borderWidth: 2,
          marginTop: 10,
          width: '60%',
          borderColor: Springgreen,
          borderRadius: 10,
        }}></TextInput>
      <Button title="login" onPress={handleSubmit} />
    </View>
  );
}
export default Login;
