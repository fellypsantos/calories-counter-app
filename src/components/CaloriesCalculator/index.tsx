import { useFoodRecord } from "../../hooks/food";
import { useProfile } from "../../hooks/profile";
import { Container, ContainerKcalInfo, KcalLabel, KcalValue } from "./styles";

export default function CaloriesCalculator() {
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
        <KcalLabel>(Kcal)</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo>
        <KcalValue>{basalMetabolicExpenditure}</KcalValue>
        <KcalLabel>Max</KcalLabel>
      </ContainerKcalInfo>
    </Container>
  )
}
