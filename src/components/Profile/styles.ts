import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.View`
  align-items: center;
`;

export const ProfilePictureContainer = styled.View`
  border-width: 2px;
  border-color:  ${Colors.Contrast};
  background-color: ${Colors.Contrast};
  border-radius: 50px;
  overflow: hidden;
  width: 100px;
  height: 100px;
`;

export const ProfilePicture = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Name = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 25px;
  color: ${Colors.Contrast};
  margin-bottom: 5px;
`;

export const Phrase = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${Colors.Contrast};
  font-style: italic;
`;
