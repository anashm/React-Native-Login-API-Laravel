import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const AppLoader = props => {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        {backgroundColor: props.backgroundColor},
      ]}>
      <LottieView
        source={require('../../assets/json_loading_file.json')}
        autoPlay
        loop
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 1,
  },
});
export default AppLoader;
