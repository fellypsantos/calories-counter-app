import React from 'react';
import { KeyboardTypeOptions } from 'react-native'

import {
  ButtonInputHandler,
  ButtonInputHandlerIcon,
  Container,
  TextInputControl,
} from './styles';

import FormLabelControl from '../FormLabelControl';

interface ITextInputCustom {
  value: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  renderAsDateTimePicker?: boolean;
  autoCorrect?: boolean;
  onChange(text: string): void;
  handlePressIcon(): void;
}

const TextInputCustom = ({
  value,
  placeholder,
  onChange,
  renderAsDateTimePicker,
  handlePressIcon,
  keyboardType = 'default',
  label = 'TheLabel',
  autoCorrect = false
}: ITextInputCustom) => (
  <>
    <FormLabelControl text={label} />
    <Container>
      <TextInputControl
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        editable={!renderAsDateTimePicker}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
      />

      <ButtonInputHandler onPress={handlePressIcon}>
        <ButtonInputHandlerIcon
          name={renderAsDateTimePicker ? 'clock' : 'trash'}
          size={18}
        />
      </ButtonInputHandler>
    </Container>
  </>
);

export default TextInputCustom;
