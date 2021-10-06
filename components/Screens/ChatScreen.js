import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Keyboard,
} from 'react-native';
import {Springgreen} from '../services/Color';
import firebase, {database} from './../database/Firebase';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {Avatar, Icon} from 'react-native-elements';

// import firebase, {firestore} from 'firebase';
// import { Firestore } from 'firebase/firestore';

function ChatScreen({navigation, chatId, emailId}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (chatId != null) console.log(chatId);
    let length = 0;
    firebase
      .database()
      .ref('chats')
      .child(chatId.chatId)
      .on('value', snapshot => {
        length = allMessages.length;
        let messages = [];
        snapshot.forEach(value => {
          messages.push(value.val());
        });
        // console.log(snapshot.val());
        console.log(messages.length + ' ' + length);
        if (length == 0) setAllMessages(messages);
        else setAllMessages([...allMessages, messages[messages.length - 1]]);

        // setRefresh(false);
        // let mess = JSON.parse(JSON.stringify(allMessages));
        // if (allMessages.length == 0) setAllMessages(messages);
        // else {
        //   if (messages[messages.length - 1].sender != emailId.split('@')[0])
        //     setAllMessages([...allMessages, messages[messages.length - 1]]);
        // }

        // setAllMessages([...allMessages, messages[messages.length - 1]]);
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
    setRefresh(true);
    await firebase
      .database()
      .ref('chats')
      .child(chatId.chatId)
      .push({
        sender: emailId.split('@')[0],
        message: message,
        time: Date.now(),
      });

    Keyboard.dismiss();

    setMessage('');
    // window.scrollBy(10);
    // window.scrollBy(0, 10);

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
          flex: 0.8,
          flexDirection: 'row',
          backgroundColor: Springgreen,
          // margin: 10,

          minHeight: 24,
        }}>
        {/* <Button title={chatId.name} color="black" /> */}
        <Avatar
          rounded
          titleStyle={{color: Springgreen, fontSize: 20}}
          title={emailId.split('@')[0].substring(0, 2).toUpperCase()}
          containerStyle={{backgroundColor: 'white', margin: 7}}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'left',
            margin: 9,
            fontWeight: 'bold',
          }}>
          {chatId.email.split('@')[0].toUpperCase()}
        </Text>
      </View>
      <View style={{flex: 10, backgroundColor: 'white'}}>
        <FlatList
          data={allMessages}
          scrollToOverflowEnabled={true}
          style={{paddingBottom: 40, minHeight: 'auto'}}
          // inverted={true}
          // inverted={-1}          refreshControl={refresh}

          // contentContainerStyle={{flexDirection: 'column-reverse'}}
          // initialScrollIndex={allMessages.length - 1}
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
        style={{
          flex: 1,
          padding: 20,
          flexDirection: 'row',
          backgroundColor: Springgreen,
        }}>
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
              backgroundColor: Springgreen,
              color: 'white',
              marginTop: 10,

              height: 30,

              textAlign: 'center',
              borderRadius: 10,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            {' '}
            {/* <AiOutlineSend /> */}
            <Icon
              // size={30}
              name="paper-plane"
              type="font-awesome"
              color={'white'}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChatScreen;
