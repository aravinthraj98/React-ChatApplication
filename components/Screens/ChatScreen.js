import React, {useEffect} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Springgreen} from '../services/Color';
import firebase, {database} from './../database/Firebase';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';

// import firebase, {firestore} from 'firebase';
// import { Firestore } from 'firebase/firestore';

function ChatScreen() {
  useEffect(async () => {
    // const ref = firebase.database().ref('user');
    // ref.push({
    //   name: 'aravinth',
    // });
    // const text = await db
    //   .collection('USERS')
    //   .doc('One')
    //   .get();
    // db.collection('groups')
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       console.log(doc.data());
    //     });
    //   });
    // text.docs.forEach(doc => {
    //   console.log(doc.data());
    //   console.log('here');
    //   // console.log(doc);
    // });
    // console.log(text);
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: Springgreen}}>
        
      </View>
      <View style={{flex: 6, backgroundColor: 'white'}}></View>
      <View
        style={{flex: 1, flexDirection: 'row', backgroundColor: Springgreen}}>
        <TextInput
          placeholder={'Type message...'}
          style={{
            flex: 4,
            borderWidth: 2,
            backgroundColor: 'white',

            height: 40,
            margin: 5,
            borderRadius: 10,
            width: '90%',
            borderColor: Springgreen,
          }}></TextInput>
        <TouchableOpacity style={{flex: 1}}>
          <Text
            style={{
              backgroundColor: 'white',
              color: Springgreen,
              marginTop: 10,
              margin: 2,
              height: 35,
              textAlign: 'center',
              borderRadius: 10,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            {' '}
            {/* <AiOutlineSend /> */}
            send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChatScreen;
