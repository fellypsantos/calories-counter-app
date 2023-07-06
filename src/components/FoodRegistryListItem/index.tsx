import Colors from "../../Colors";
import { Container, FoodInfo, FoodName, IconContainer, IconImage, RegistryDataContainer } from "./styles";
import Icon from '@expo/vector-icons/FontAwesome5';

const TimeIcons = {
  sunrise: require('../../../assets/images/sunrise.png'),
  sun: require('../../../assets/images/sun.png'),
  moon: require('../../../assets/images/moon.png'),
};

export default function FoodRegistryListItem() {
  return (
    <Container>
      <IconContainer>
        <IconImage source={TimeIcons['sunrise']} />
      </IconContainer>

      <RegistryDataContainer>
        <FoodName>Churrasco</FoodName>
        <FoodInfo>Alimentação Pesada | 12h30</FoodInfo>
        <FoodInfo>540 kcal</FoodInfo>
      </RegistryDataContainer>

      {/* smile | exclamation-triangle | sad-tear */}
      <Icon name='smile' size={20} color={Colors.Primary} />
    </Container>
  )
}
