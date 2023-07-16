import styled from 'styled-components/native';
import Colors from '../../Colors';

interface IActionButtonProps {
  showAsCancel?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

export const IconContainer = styled.View`
  align-items: center;
  margin-top: 30px;
`;

export const Title = styled.Text`
  font-family: 'Open Sans Bold';
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  font-family: 'Open Sans Regular';
  padding: 10px 25px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 5px;
`;

export const ActionButton = styled.TouchableOpacity<IActionButtonProps>`
  padding: 10px 20px;
  background-color: ${props => props.showAsCancel ? '#fff' : Colors.Secondary};
  elevation: 3;
  border-width: 1px;
  border-color: #dedede;
  border-radius: 5px;
  justify-content: center;
  margin: 0px 5px;
`;

export const ActionButtonText = styled.Text<IActionButtonProps>`
  text-align: center;
  color: ${props => (props.showAsCancel ? '#555' : '#fff')};
`;
