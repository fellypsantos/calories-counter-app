import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.View`
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  background-color: ${Colors.Primary};
  color: #fff;
  align-self: flex-start;
  padding: 5px 10px;
  font-family: 'Open Sans Regular';
  border-radius: 6px 6px 0px 0px;
`;

export const MainText = styled.Text`
  background-color: #efefef;
  padding: 10px;
  font-family: 'Open Sans Regular';
  border-radius: 0px 0px 6px 6px;
`;
