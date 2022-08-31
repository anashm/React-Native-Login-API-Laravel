import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, validatePathConfig} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import api from '../api/register';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [emailInput, setEmailInput] = useState('');
  const [PasswordInput, setPasswordInput] = useState('');
  const [civiliteInput, setCiviliteInput] = useState('');
  const [nomInput, setnomInput] = useState('');
  const [prenomInput, setPrenomInput] = useState('');
  const [villeeInput, setVilleInput] = useState('');
  const [adresseInput, setAdresseInput] = useState('');
  const [picturePath, setPicturePath] = useState();

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  const HandleImageUpload = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert('Maximum size exceeded', 'Please choose image under 2Mb', [
          {text: 'Ok'},
        ]);
      } else {
        const image = response.assets[0].uri;
        console.log(image);
        setPicturePath(image);
      }
    });
  };
  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');

      return false;
    } else {
      // setEmailInput(text);
      return true;
      console.log('Email is Correct');
    }
  };

  const HandleSignUP = async () => {
    if (
      !nomInput ||
      !prenomInput ||
      !emailInput ||
      !picturePath ||
      !PasswordInput ||
      !villeeInput ||
      !adresseInput
    ) {
      console.warn('Tous les champs sont obligatoires');
      return;
    }
    if (!validateEmail(emailInput)) {
      console.warn('Please enter a valid email');
      return;
    }
    try {
      const res = await api.register(
        nomInput,
        prenomInput,
        emailInput,
        picturePath,
        civiliteInput,
        PasswordInput,
        villeeInput,
        adresseInput,
      );
      console.log(res);
      if (res) {
        navigation.navigate('ProfileScreen', {
          userID: res.resultat,
        });
        // user_infos.setUserID(result.data.userID);
      }
    } catch (error) {
      console.log('errror', error);
      console.warn('une erreur est survenu');
    }
  };
  return (
    <View style={styles.Inputscontainer}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>
            Register
          </Text>
        </View>
        <View style={{marginHorizontal: 10}}>
          <TextInput
            value={emailInput}
            placeholder="Entrer votre email"
            onChangeText={text => setEmailInput(text)}
            style={styles.Input}
          />
          <TextInput
            value={PasswordInput}
            placeholder="Entrer votre Password"
            onChangeText={text => setPasswordInput(text)}
            style={styles.Input}
            secureTextEntry={true}
          />
          <TextInput
            value={prenomInput}
            placeholder="Entrer votre Prenom"
            onChangeText={text => setPrenomInput(text)}
            style={styles.Input}
          />
          <TextInput
            value={nomInput}
            placeholder="Entrer votre Nom"
            onChangeText={text => setnomInput(text)}
            style={styles.Input}
          />
          {picturePath && (
            <Avatar.Image size={230} source={{uri: picturePath}} />
          )}

          <Button title="Upload Image" onPress={HandleImageUpload} />
          <Picker
            selectedValue={civiliteInput}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              setCiviliteInput(itemValue)
            }>
            <Picker.Item label="Homme" value="Homme" />
            <Picker.Item label="Femme" value="Femme" />
          </Picker>
          {/* <TextInput
            value={civiliteInput}
            placeholder="Entrer votre civilité"
            onChangeText={text => setCiviliteInput(text)}
            style={styles.Input}
          /> */}
          <TextInput
            value={villeeInput}
            placeholder="Entrer votre ville"
            onChangeText={text => setVilleInput(text)}
            style={styles.Input}
          />
          <TextInput
            value={adresseInput}
            placeholder="Entrer votre adresse"
            onChangeText={text => setAdresseInput(text)}
            style={styles.Input}
          />
          <Button title="Signup " onPress={HandleSignUP} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Inputscontainer: {
    flex: 1,
  },
  Input: {
    borderColor: '#F7F7F7',
    borderWidth: 2,

    margin: 16,
    padding: 8,
    backgroundColor: '#F7F7F7',
    color: 'black',
  },
});

export default RegisterScreen;
