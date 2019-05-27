import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/Home';
import TokenScreen from './screens/Token';
import AuthenticationScreen from './screens/Authentication';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Token: { screen: TokenScreen },
  Authentication: { screen: AuthenticationScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
