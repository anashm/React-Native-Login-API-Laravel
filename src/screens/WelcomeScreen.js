import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewContainer}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>
          Welcome To our App
        </Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <View style={{marginVertical: 40}}>
          <Button
            title="Log IN"
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </View>

        <Button
          title="Register"
          onPress={() => navigation.navigate('RegisterScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default WelcomeScreen;
