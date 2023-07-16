import { useFoodRecord } from "../../hooks/food";
import { useProfile } from "../../hooks/profile";
import { useAppTranslation } from "../../hooks/translation";
import { Container, ContainerKcalInfo, KcalLabel, KcalValue } from "./styles";

export default function CaloriesCalculator() {
  const { Translate } = useAppTranslation();
  const { basalMetabolicExpenditure } = useProfile();
  const { caloriesIngested } = useFoodRecord();

  return (
    <Container>
      <ContainerKcalInfo>
        <KcalValue>1200</KcalValue>
        <KcalLabel>Min</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo isMiddle>
        <KcalValue isMiddle>{caloriesIngested}</KcalValue>
        <KcalLabel>{Translate('Consumed')} (Kcal)</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo>
        <KcalValue>{basalMetabolicExpenditure}</KcalValue>
        <KcalLabel>Max</KcalLabel>
      </ContainerKcalInfo>
    </Container>
  )
}
