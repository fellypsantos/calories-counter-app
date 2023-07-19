import styled from 'styled-components/native';
import Colors from '../../Colors';

interface ICustomSubtitleProps {
  renderAsParagraph?: boolean;
  useMarginTop?: boolean;
}

export const CustomSubtitle = styled.Text<ICustomSubtitleProps>`
  font-family: 'Open Sans Regular';
  font-size: 15px;
  color: ${Colors.TextPrimary};
  margin-top: ${props => props.renderAsParagraph ? '10px' : '0px'};
  margin-bottom: ${props => props.renderAsParagraph ? '20px' : '0px'};
`;
