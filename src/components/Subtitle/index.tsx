import React from 'react';
import { CustomSubtitle } from './styles';

interface IProps {
  children: React.ReactNode,
}

const Subtitle = ({ children }: IProps) => <CustomSubtitle>{children}</CustomSubtitle>;

export default Subtitle;
