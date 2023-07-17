import React from 'react';
import { CustomSubtitle } from './styles';

interface IProps {
  children: React.ReactNode,
  renderAsParagraph?: boolean,
  useMarginTop?: boolean,
}

const Subtitle = ({ children, renderAsParagraph, useMarginTop }: IProps) => (
  <CustomSubtitle
    renderAsParagraph={renderAsParagraph}
    useMarginTop={useMarginTop}>{children}</CustomSubtitle>
)

export default Subtitle;
