import React from 'react';

import { IButton } from '../../interfaces/IButton';

import { Container, IconBox, Label } from './styles';

const ButtonDefault = ({ text = '', onPress }: IButton) => (
  <Container onPress={onPress}>
    <>
      <IconBox name="check" size={18} />
      <Label>{text}</Label>
    </>
  </Container>
);

export default ButtonDefault;
