import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TextInputProps } from 'react-native';

import { Container, TextInput } from './styles';
import { AppColors } from '../../styles/colors';

interface InputProps extends TextInputProps {
  icon: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  icon,
  error = false,
  style = [],
  ...rest
}) => {
  return (
    <Container isErrored={error} style={style}>
      <TextInput {...rest} />

      <FeatherIcon
        name={error ? 'alert-circle' : icon}
        size={20}
        color={error ? AppColors.error : '#fff'}
      />
    </Container>
  );
};
