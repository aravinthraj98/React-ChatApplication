import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from 'react-native';
import {Springgreen} from '../services/Color';
import firebase, {database} from './../database/Firebase';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';

// import firebase, {firestore} from 'firebase';
// import { Firestore } from 'firebase/firestore';

function ChatScreen({navigation, chatId, emailId}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    if (chatId != null) console.log(chatId);

    firebase
      .database()
      .ref('chats')
      .child(chatId.chatId)
      .on('value', snapshot => {
        let messages = [];
        snapshot.forEach(value => {
          messages.push(value.val());
        });
        // console.log(snapshot.val());
        console.log(messages);
        // console.log(allMessages);

        setAllMessages(messages);
      });
    // console.log(allMessages);

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
  async function sendMessage() {
    console.log('message added');
    await firebase
      .database()
      .ref('chats')
      .child(chatId.chatId)
      .push({
        sender: emailId.split('@')[0],
        message: message,
        time: Date.now(),
      });
    setMessage('');
    // setAllMessages([
    //   ...allMessages,
    //   {
    //     sender: emailId.split('@')[0],
    //     message: message,
    //     time: Date.now(),
    //   },
    // ]);
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: Springgreen,
          margin: 10,
          minHeight: 30,
        }}>
        <Button title={chatId.name} color="black" />
        <Text>{chatId.email}</Text>
      </View>
      <View style={{flex: 6, backgroundColor: 'white'}}>
        <FlatList
          data={allMessages}
          scrollToOverflowEnabled={true}
          scrollsToTop={false}
          // automaticallyAdjustContentInsets={true}
          renderItem={({item}) => {
            // console.log(item);
            if (item && item.sender == emailId.split('@')[0])
              return (
                <View
                  style={{
                    minWidth: 'auto',
                    maxWidth: '80%',
                    margin: 5,
                    marginRight: 35,
                    padding: 6,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    backgroundColor: 'lightgreen',
                    color: 'black',
                  }}>
                  <Text>
                    {item != null ? item.message : 'say hi to friend'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: 'blue',
                      margin: 2,
                      textAlign: 'right',
                    }}>
                    {item && new Date(item.time).toLocaleTimeString()}
                  </Text>
                </View>
              );
            else
              return (
                <View
                  style={{
                    minWidth: 'auto',
                    maxWidth: '80%',
                    margin: 5,
                    marginLeft: 25,
                    padding: 6,
                    alignSelf: 'flex-start',
                    justifyContent: 'flex-start',
                    backgroundColor: 'lightblue',
                    color: 'black',
                  }}>
                  <Text>
                    {item != null ? item.message : 'say hi to friend'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: 'blue',
                      margin: 2,
                      textAlign: 'right',
                    }}>
                    {item && new Date(item.time).toLocaleTimeString()}
                  </Text>
                </View>
              );
          }}
        />
      </View>
      <View
        style={{flex: 1, flexDirection: 'row', backgroundColor: Springgreen}}>
        <TextInput
          placeholder={'Type message...'}
          value={message}
          onChangeText={setMessage}
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
        <TouchableOpacity onPress={sendMessage} style={{flex: 1}}>
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
