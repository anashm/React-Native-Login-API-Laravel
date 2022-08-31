import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <View style={{height: '100%'}}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
};

export default App;
