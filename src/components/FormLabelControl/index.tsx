import React from 'react';
import { TextControl } from './styles';

interface IProps {
  text: string;
}

const FormLabelControl = ({ text }: IProps) => <TextControl>{text}</TextControl>;

export default FormLabelControl;
