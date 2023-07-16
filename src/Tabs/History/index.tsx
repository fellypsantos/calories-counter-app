import { useAppTranslation } from "../../hooks/translation";
import { useFoodRecord } from "../../hooks/food";
import FoodRegistryListItem from "../../components/FoodRegistryListItem";

import DatePickerMenuBar from "../../components/DatePickerMenuBar";
import {
  Container,
  FoodHistoryList,
  KcalSumContainer,
  KcalSumText,
  ListItemContainer,
  LoadingSpinner
} from "./styles";
import NoFoodRegistry from "../../components/NoFoodRegistry";

export default function History() {

  const { Translate } = useAppTranslation();

  const {
    foodHistoryFromDate,
    loadFoodHistoryFromDate,
    loadingFoodHistoryFromDate,
    caloriesIngestedInDate
  } = useFoodRecord();

  return (
    <Container>
      <DatePickerMenuBar onDateChange={loadFoodHistoryFromDate} />

      {
        loadingFoodHistoryFromDate && <LoadingSpinner size={35} />
      }

      {
        !loadingFoodHistoryFromDate && foodHistoryFromDate.length === 0 && <NoFoodRegistry />
      }

      {
        !loadingFoodHistoryFromDate && foodHistoryFromDate.length > 0 && (
          <>
            <FoodHistoryList
              data={foodHistoryFromDate}
              keyExtractor={item => item.id!.toString()}
              renderItem={({ item }) => (
                <ListItemContainer>
                  <FoodRegistryListItem foodRecord={item} />
                </ListItemContainer>
              )}
            />
            <KcalSumContainer>
              <KcalSumText>
                {Translate('TotalCaloriesInList')} {caloriesIngestedInDate} Kcal
              </KcalSumText>
            </KcalSumContainer>
          </>
        )
      }
    </Container>
  )
}
