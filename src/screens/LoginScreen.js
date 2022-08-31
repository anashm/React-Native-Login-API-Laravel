import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import authAPI from '../api/login';
import {useNavigation} from '@react-navigation/native';
// import {useCurrentUser} from '../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [emailInput, setEmailInput] = useState('');
  const [PasswordInput, setPasswordInput] = useState('');
  // const user_infos = useCurrentUser();

  const HandleLogin = async () => {
    if (!emailInput || !PasswordInput) {
      console.warn('Enter email and password');
      return;
    }

    const result = await authAPI.login(emailInput, PasswordInput);
    if (result && result.status == 201) {
      navigation.navigate('ProfileScreen', {
        userID: result.data.userID,
      });
      // user_infos.setUserID(result.data.userID);
    } else console.warn('User not Found');
    // console.log('resultss', result.status);
  };
  return (
    <View style={styles.Inputscontainer}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>
          Login
        </Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <TextInput
          value={emailInput}
          placeholder="Enter your email"
          onChangeText={text => setEmailInput(text)}
          style={styles.Input}
        />
        <TextInput
          value={PasswordInput}
          placeholder="Enter your Password"
          onChangeText={text => setPasswordInput(text)}
          style={styles.Input}
          secureTextEntry={true}
        />
        <Button title="LogIN" onPress={HandleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Inputscontainer: {
    flex: 1,

    justifyContent: 'center',
  },
  Input: {
    borderColor: '#F7F7F7',
    borderWidth: 2,
    alignSelf: 'stretch',
    margin: 16,
    padding: 8,
    backgroundColor: '#F7F7F7',
    color: 'black',
  },
});
export default LoginScreen;
