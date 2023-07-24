import styled from 'styled-components/native';
import Colors from '../../Colors';
import Icon from '@expo/vector-icons/FontAwesome5';
import { TextInputProps, TextInput } from 'react-native';
import { ForwardedRef } from 'react';

export const Container = styled.View`
  flex-direction: row;
  padding: 1px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${Colors.Primary};
`;

interface ITextInputControl extends TextInputProps {
  ref: ForwardedRef<TextInput>;
}

export const TextInputControl = styled.TextInput<ITextInputControl>`
  flex: 1;
  font-family: 'Open Sans Regular';
  font-size: 16px;
  padding: 8px 10px;
`;

export const ButtonInputHandler = styled.TouchableOpacity`
  justify-content: center;
  padding: 0 10px;
`;

export const ButtonInputHandlerIcon = styled(Icon)`
  color: ${Colors.Primary};
`;
