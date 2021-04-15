import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import VideoLink from '../pages/VideoLink';
import { AppColors } from '../styles/colors';

const AppNavigator = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <AppNavigator.Navigator initialRouteName="Home">
    <AppNavigator.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        cardStyle: {
          backgroundColor: AppColors.background.color_1,
        },
      }}
    />
    <AppNavigator.Screen
      name="VideoLink"
      component={VideoLink}
      options={{
        headerShown: false,
        cardStyle: {
          backgroundColor: AppColors.background.color_1,
        },
      }}
    />
  </AppNavigator.Navigator>
);
