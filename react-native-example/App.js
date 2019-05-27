import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/Home';
import TokenScreen from './screens/Token';
import AuthenticationScreen from './screens/Authentication';
import ValidationScreen from './screens/Validation';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Token: { screen: TokenScreen },
  Authentication: { screen: AuthenticationScreen },
  Validation: { screen: ValidationScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
