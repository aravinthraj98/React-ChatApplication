import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Springgreen} from '../services/Color';
import firebase, {auth} from './../database/Firebase';
// rr
function Login({navigation, SetLog}) {
  // r
  const initialState = {
    email: '',
    password: '',
  };
  const [login, setLogin] = useState(initialState);
  function handleChange(name, value) {
    setLogin({...login, [name]: value});
  }
  async function handleSubmit() {
    console.log(login);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(login.email, login.password);
      SetLog(login.email);
    } catch (error) {
      console.log(error);
      alert('not a valid credential');
    }

    // console.log(ref);
  }
  function navigateSignUp() {
    navigation.navigate('SignUp');
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
          marginBottom: 20,
          width: '60%',
          borderColor: Springgreen,
          borderRadius: 10,
        }}></TextInput>
      <View style={{width: '60%'}}>
        <Button color={Springgreen} title="login" onPress={handleSubmit} />
      </View>

      <View style={{flexDirection: 'row', margin: 10}}>
        <Text style={{marginTop: 10}}>Create New Account?</Text>
        <Button title="SignUp" onPress={navigateSignUp} />
      </View>
    </View>
  );
}
export default Login;
