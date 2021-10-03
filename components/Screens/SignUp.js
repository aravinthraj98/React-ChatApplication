import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Springgreen} from '../services/Color';
import firebase, {auth} from './../database/Firebase';
// rr
function SignUp() {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [login, setLogin] = useState(initialState);
  function handleChange(name, value) {
    setLogin({...login, [name]: value});
    // console.log(login);
  }
  function handleSubmit() {
    if (login.password != login.confirmPassword) return;
    const ref = firebase
      .auth()
      .createUserWithEmailAndPassword(login.email, login.password);
    console.log(ref);
    console.log(login.email + ' ' + login.password);
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
  });
  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: Springgreen}}>SignUp</Text>
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
      <TextInput
        placeholder={'Confirm password'}
        onChangeText={text => handleChange('confirmPassword', text)}
        style={{
          borderWidth: 2,
          marginTop: 10,
          width: '60%',
          borderColor: Springgreen,
          borderRadius: 10,
          marginBottom: 4,
        }}></TextInput>
      <Button title="signUp" onPress={handleSubmit} />
    </View>
  );
}
export default SignUp;
