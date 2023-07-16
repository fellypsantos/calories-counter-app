import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/FontAwesome5';
import Colors from '../../Colors';

interface ICheckable {
  isChecked: boolean;
}

interface IMiddleItem {
  isMiddle: boolean;
}

const handleMarginMiddleBlock = (props: IMiddleItem) => (props.isMiddle ? '5px' : '0');

export const MainContainer = styled.View`
  flex-direction: row;
`;

export const TouchableContainer = styled.TouchableHighlight<IMiddleItem>`
  flex: 1;
  margin-left: ${handleMarginMiddleBlock};
  margin-right: ${handleMarginMiddleBlock};
  border-radius: 10px;
  overflow: hidden;
`;

export const Container = styled.View<ICheckable>`
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isChecked ? Colors.Primary : '#dfdfdf'};
`;

export const TheLabel = styled.Text<ICheckable>`
  margin-top: 8px;
  color: ${props => (props.isChecked ? '#fff' : '#000')};
`;

export const TheIcon = styled(Icon)`
  color: ${props => (props.isChecked ? '#fff' : '#000')};
`;
