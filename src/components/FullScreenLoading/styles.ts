import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.Primary};
`;

export const LoadingSpinner = styled.ActivityIndicator.attrs({
  size: 25,
  color: '#fff',
})``;
