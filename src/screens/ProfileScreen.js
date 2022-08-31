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
import React, {useEffect, useState} from 'react';
import api from '../api/getUserInfos';
import AppLoader from '../components/Apploader';
import apiProfile from '../api/updateProfile';
import {Picker} from '@react-native-picker/picker';
import {Avatar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import settings from '../settings/settings';

const ProfileScreen = ({navigation, route}) => {
  const baseURL = settings.getCurrentSettings();
  // const user_infos = useCurrentUser();
  const [emailInput, setEmailInput] = useState('');
  const [civiliteInput, setCiviliteInput] = useState('');
  const [nomInput, setnomInput] = useState('');
  const [prenomInput, setPrenomInput] = useState('');
  const [villeeInput, setVilleInput] = useState('');
  const [adresseInput, setAdresseInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [picturePath, setPicturePath] = useState();

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

  const HandleUpdateUser = async () => {
    if (route.params.userID) {
      if (
        !nomInput ||
        !prenomInput ||
        !emailInput ||
        !picturePath ||
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
        const userID = route.params.userID;
        const result = await apiProfile.updateProfile(
          userID,
          emailInput,
          civiliteInput,
          nomInput,
          prenomInput,
          villeeInput,
          adresseInput,
          picturePath,
        );
        if (result) {
          console.warn('Profile Updated');
        }
      } catch (error) {
        console.log('error', error);
        console.warn('une erreur est survenue');
      }
    }
  };
  useEffect(() => {
    if (route.params.userID) {
      const userID = route.params.userID;
      console.log('hna f profile page', userID);
      const getUserData = async userID => {
        const result = await api.getUserInfos(userID);
        if (result && result.status == 201) {
          setEmailInput(result.data.user.email);
          setCiviliteInput(result.data.user.civilite);
          setnomInput(result.data.user.nom);
          setPrenomInput(result.data.user.prenom);
          setVilleInput(result.data.user.ville);
          setAdresseInput(result.data.user.adresse);
          setPicturePath(`${baseURL}/storage/images/${result.data.user.photo}`);
          setLoading(false);
        }
      };
      getUserData(userID);
    }
  }, []);

  return (
    <>
      {loading ? (
        <AppLoader backgroundColor="rgba(0,0,0,0.3)" />
      ) : (
        <View style={styles.Inputscontainer}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>
                Welcome to your Porfile Screen
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
              <Picker
                selectedValue={civiliteInput}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  setCiviliteInput(itemValue)
                }>
                <Picker.Item label="Homme" value="Homme" />
                <Picker.Item label="Femme" value="Femme" />
              </Picker>

              {picturePath && (
                <Avatar.Image size={230} source={{uri: picturePath}} />
              )}

              <Button title="Change Image" onPress={HandleImageUpload} />
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
              <Button title="Signup " onPress={HandleUpdateUser} />
            </View>
          </ScrollView>
        </View>
      )}
    </>
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

export default ProfileScreen;
