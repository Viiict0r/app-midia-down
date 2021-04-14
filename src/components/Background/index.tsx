import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { AppColors } from '../../styles/colors';

// import { Container } from './styles';

export const Background: React.FC = ({ children, ...rest }) => {
  return (
    <LinearGradient
      {...rest}
      colors={[AppColors.background.color_1, AppColors.background.color_2]}
    >
      {children}
    </LinearGradient>
  );
};
