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
  useEffect(async () => {
    await db.ref('user/aravinth799902@gmail.com').push({name: 'aravinth'});
    console.log('created');
  }, []);

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
              style={{border: 2, borderColor: Springgreen}}
              placeholder="enter email"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
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
