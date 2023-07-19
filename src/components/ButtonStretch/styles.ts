import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  background-color: #16a085;
  padding: 15px 10px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 0px 5px #555;
  font-size: 15px;
`;
