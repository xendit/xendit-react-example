import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/Home';
import TokenScreen from './screens/Token'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Token: {screen: TokenScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
