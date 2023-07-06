import { Container, ContainerKcalInfo, KcalLabel, KcalValue } from "./styles";

export default function CaloriesCalculator() {
  return (
    <Container>
      <ContainerKcalInfo>
        <KcalValue>0</KcalValue>
        <KcalLabel>Min</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo isMiddle>
        <KcalValue isMiddle>0</KcalValue>
        <KcalLabel>0 (KCal)</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo>
        <KcalValue>0</KcalValue>
        <KcalLabel>Max</KcalLabel>
      </ContainerKcalInfo>
    </Container>
  )
}
