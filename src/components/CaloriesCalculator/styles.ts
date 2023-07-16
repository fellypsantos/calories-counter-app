import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Colors from '../../Colors';

interface IBlockPosition {
  isMiddle?: boolean;
}

const getBorderWidth = (isMiddle?: boolean) => isMiddle ? '1px' : '0px';

export const Container = styled(RectButton)`
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ContainerKcalInfo = styled.View<IBlockPosition>`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-color: ${Colors.Contrast};
  border-left-width: ${props => getBorderWidth(props.isMiddle)};
  border-right-width:  ${props => getBorderWidth(props.isMiddle)};
`;

export const KcalValue = styled.Text<IBlockPosition>`
  font-family: 'Open Sans Regular';
  font-size: ${props => (props.isMiddle ? '30px' : '20px')};
  font-weight: ${props => (props.isMiddle ? 'bold' : 'normal')};
  color: ${Colors.TextSecondary};
  margin-bottom: 5px;
`;

export const KcalLabel = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${Colors.TextSecondary};
`;
