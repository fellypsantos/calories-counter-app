import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
}))`
  background-color: ${Colors.Primary};
  padding: 20px 0px;
`;

export const AppTitle = styled.Text`
  color: #fff;
  font-family: 'Open Sans Bold';
  font-size: 30px;
  text-align: center;
`;

export const AppDescription = styled.Text`
  color: #fff;
  font-family: 'Open Sans Regular';
  width: 300px;
  font-size: 15px;
  text-align: center;
`;

export const AppLogo = styled.Image`
  width: 150px;
  height: 150px;
  margin: 50px auto;
`;

export const AppStart = styled.TouchableHighlight.attrs({
  underlayColor: Colors.Secondary,
})`
  background-color: ${Colors.Contrast};
  padding: 10px 18px;
  border-radius: 20px;
  margin-top: 50px;
  elevation: 5;
`;

export const AppStartText = styled.Text`
  font-family: 'Open Sans Bold';
  text-align: center;
`;
