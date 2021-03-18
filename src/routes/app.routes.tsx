import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import VideoLink from '../pages/VideoLink';

const AppNavigator = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <AppNavigator.Navigator initialRouteName="Home">
    <AppNavigator.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <AppNavigator.Screen name="VideoLink" component={VideoLink} />
  </AppNavigator.Navigator>
);
