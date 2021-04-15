import styled from 'styled-components/native';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  background-color: ${props => (props.isErrored ? '#FF58581c' : '#ffffff1c')};
  border-radius: 10px;
  padding: 8px 10px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 14px;
  font-family: 'Poppins-Light';
  flex: 1;
  margin-right: 10px;
`;
