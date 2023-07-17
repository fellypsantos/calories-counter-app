import styled from 'styled-components/native';

export const Scrollable = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: '#fff',
  }
})``;

export const Container = styled.View`
  margin: 35px 20px;
`;

export const CloseIconBox = styled.TouchableOpacity`
  padding-left: 15px;
  align-self: flex-end;
`;

export const NativeBannerContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
