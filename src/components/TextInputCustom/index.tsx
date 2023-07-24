import React, { forwardRef } from 'react';
import { KeyboardTypeOptions, TextInput, TextInputProps } from 'react-native'

import {
  ButtonInputHandler,
  ButtonInputHandlerIcon,
  Container,
  TextInputControl,
} from './styles';

import FormLabelControl from '../FormLabelControl';

interface ITextInputCustom {
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  renderAsDateTimePicker?: boolean;
  autoCorrect?: boolean;
  onChange(text: string): void;
  handlePressIcon(): void;
  onSubmitEditing?(): void;
}

const TextInputCustom = forwardRef<TextInput, ITextInputCustom>(({
  value,
  placeholder,
  onChange,
  renderAsDateTimePicker,
  handlePressIcon,
  onSubmitEditing,
  keyboardType = 'default',
  label = 'TheLabel',
  autoCorrect = false
}: ITextInputCustom, ref) => (
  <>
    <FormLabelControl text={label} />
    <Container>
      <TextInputControl
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        editable={!renderAsDateTimePicker}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
      />

      <ButtonInputHandler onPress={handlePressIcon}>
        <ButtonInputHandlerIcon
          name={renderAsDateTimePicker ? 'clock' : 'trash'}
          size={18}
        />
      </ButtonInputHandler>
    </Container>
  </>
));

export default TextInputCustom;
