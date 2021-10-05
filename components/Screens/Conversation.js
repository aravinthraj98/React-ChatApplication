import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import firebase from '../database/Firebase';
import {Springgreen} from '../services/Color';
const db = firebase.database();
function Conversation() {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatDetail, setChatDetail] = useState([]);
  const [email, setEmail] = useState('');
  useEffect(async () => {
    // await db.ref('user').child('aravinth98').push({name: 'aravinth'});
    // console.log('created');
    if (chatDetail == null || chatDetail.length == 0) {
      const getDetail = await db.ref('user').child('aravinth').get();
      console.log(getDetail.val());

      let chat = [];
      getDetail.forEach(data => {
        // data.forEach(s => console.log(s));

        chat.push(data.val());
      });
      setChatDetail(chat);
    }
  }, []);
  async function AddUser() {
    setModalVisible(!modalVisible);
    let isEmail = -1;
    if (chatDetail != null) {
      console.log(chatDetail);
      isEmail = chatDetail.findIndex(val => val.email == email);

      //   chatDetail.map(data => {
      //     console.log(data.email == email);

      //     if (data.email == email) {
      //       isEmail = true;

      //       // break;
      //       return;
      //     }
      //   });
      // }
    }
    console.log(isEmail);
    if (isEmail != -1) {
      alert('Chat already added');
      console.log('already Email');
       return;  
    }

   
    let newDate = Date.now();
    await db
      .ref('user')
      .child('aravinth')
      .push({
        name: email.split('@')[0],
        email: email,
        chatId: newDate,
      });
    await db.ref('user').child(email.split('@')[0]).push({
      name: 'aravinth98',
      email: 'aravinth98@gmail.com',
      chatId: newDate,
    });
    console.log('createdAll');
  }

  return (
    <View style={{flex: 1, width: '100%'}}>
      <Modal
        animationType="slide"
        transparent={true}
        style={{width: '100%'}}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{borderWi: 2, borderColor: Springgreen}}
              placeholder="enter email"
              onChangeText={setEmail}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => AddUser()}>
              <Text style={styles.textStyle}>Add user</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{flex: 1, backgroundColor: Springgreen}}>
        <Text
          style={{
            color: Springgreen,
            backgroundColor: 'white',
            width: '17%',
            margin: 40,
            height: 20,
            borderRadius: 20,
            textAlign: 'center',
          }}
          onPress={() => setModalVisible(true)}>
          Add Chat
        </Text>
      </View>
      <View style={{flex: 7}}></View>
    </View>
  );
}
export default Conversation;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
