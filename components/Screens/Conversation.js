import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firebase from '../database/Firebase';
import {Springgreen} from '../services/Color';
import {Avatar, Icon} from 'react-native-elements';
const db = firebase.database();
function Conversation({navigation, setChatId, emailId}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatDetail, setChatDetail] = useState([]);
  const [email, setEmail] = useState('');
  useEffect(async () => {
    // await db.ref('user').child('aravinth98').push({name: 'aravinth'});
    // console.log('created');
    if (chatDetail == null || chatDetail.length == 0) {
      const getDetail = await db.ref('user').child(emailId.split('@')[0]).get();
      // console.log(getDetail.val());

      let chat = [];
      getDetail.forEach(data => {
        // data.forEach(s => console.log(s));

        chat.push(data.val());
      });
      setChatDetail(chat);
      console.log(chat);
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
      .child(emailId.split('@')[0])
      .push({
        name: email.split('@')[0],
        email: email,
        chatId: newDate,
      });
    await db
      .ref('user')
      .child(email.split('@')[0])
      .push({
        name: emailId.split('@')[0],
        email: emailId,
        chatId: newDate,
      });
    let tempDetail = [...chatDetail];
    tempDetail.push({
      name: email.split('@')[0],
      email: email,
      chatId: newDate,
    });
    setChatDetail(tempDetail);
  }
  function EnterChatScreen(chatId) {
    console.log(chatId);
    setChatId(chatId);
    navigation.navigate('ChatScreen');
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
      <View
        style={{
          flex: 1,
          backgroundColor: Springgreen,
          // alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Icon
          name="comments"
          size={34}
          style={{margin: 2, marginTop: 2, padding: 4}}
          color="white"
          type="font-awesome"
        />
        <Text
          style={{
            fontSize: 35,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          Chat-Free
        </Text>
        <Text
          style={{
            color: Springgreen,
            // flex: 11,
            backgroundColor: 'white',
            width: '35%',
            margin: 40,
            height: 30,
            borderRadius: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            flexDirection: 'row',
          }}
          onPress={() => setModalVisible(true)}>
          <Icon name="user-plus" type="font-awesome" />
          Add Chat
        </Text>
      </View>
      <View style={{flex: 7, backgroundColor: 'white'}}>
        <FlatList
          style={{flex: 1}}
          data={chatDetail}
          numColumns={1}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => EnterChatScreen(item)}
              style={{
                width: '100%',
                height: 65,
                backgroundColor: 'white',
                borderBottomWidth: 0.5,
                borderColor: Springgreen,
                flexDirection: 'row',
                padding: 10,
                // alignItems: 'flex-end',
              }}>
              <Avatar
                rounded
                size="medium"
                titleStyle={{color: 'grey', fontWeight: 'bold'}}
                title={item.name.substring(0, 2).toUpperCase()}
                containerStyle={{
                  backgroundColor: 'white',
                  borderColor: Springgreen,
                  borderWidth: 1,
                }}
              />
              <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 13}}>
                {item.name}
                {'\n'}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '900',
                    margin: 2,
                    color: 'grey',
                  }}>
                  {item.email}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* </ScrollView> */}
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
