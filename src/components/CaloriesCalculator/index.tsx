import { useFoodRecord } from "../../hooks/food";
import { Container, ContainerKcalInfo, KcalLabel, KcalValue } from "./styles";

export default function CaloriesCalculator() {
  const { caloriesIngested } = useFoodRecord();

  return (
    <Container>
      <ContainerKcalInfo>
        <KcalValue>0</KcalValue>
        <KcalLabel>Min</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo isMiddle>
        <KcalValue isMiddle>{caloriesIngested}</KcalValue>
        <KcalLabel>(Kcal)</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo>
        <KcalValue>0</KcalValue>
        <KcalLabel>Max</KcalLabel>
      </ContainerKcalInfo>
    </Container>
  )
}
