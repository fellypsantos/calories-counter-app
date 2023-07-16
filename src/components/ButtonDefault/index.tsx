import React from 'react';

import { Container, IconBox, Label } from './styles';

interface IProps {
  text: string;
  onPress(): void;
}

const ButtonDefault = ({ text = '', onPress }: IProps) => (
  <Container onPress={onPress}>
    <>
      <IconBox name="check" size={18} />
      <Label>{text}</Label>
    </>
  </Container>
);

export default ButtonDefault;
