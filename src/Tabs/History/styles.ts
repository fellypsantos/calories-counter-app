import styled from 'styled-components/native';
import { IFoodRecord } from '../../interfaces/IFoodRecord';
import { FlatListProps, ActivityIndicator } from 'react-native';
import Colors from '../../Colors';

type FoodHistoryListProps = FlatListProps<IFoodRecord>;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const LoadingSpinner = styled.ActivityIndicator.attrs({
  color: Colors.Secondary,
})`
  padding-top: 50px;
`;

export const FoodHistoryList = styled.FlatList<IFoodRecord>`
  background-color: #fff;
` as React.FC<FoodHistoryListProps>;

export const ListItemContainer = styled.View`
  padding: 2px 15px;
`;

export const KcalSumContainer = styled.View`
  padding: 5px;
  background-color: #dedede;
`;

export const KcalSumText = styled.Text`
  text-align: center;
  font-family: 'Open Sans Regular';
  font-size: 14px;
`;
