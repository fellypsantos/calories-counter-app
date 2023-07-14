import dayjs from "dayjs";
import Colors from "../../Colors";
import { IFoodRecord } from "../../interfaces/IFoodRecord";
import { Container, FoodInfo, FoodName, IconContainer, IconImage, RegistryDataContainer } from "./styles";
import Icon from '@expo/vector-icons/FontAwesome5';
import { useAppTranslation } from "../../hooks/translation";

const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const TimeIcons = {
  sunrise: require('../../../assets/images/sunrise.png'),
  sun: require('../../../assets/images/sun.png'),
  moon: require('../../../assets/images/moon.png'),
};

interface IProps {
  foodRecord: IFoodRecord;
}

export default function FoodRegistryListItem({ foodRecord }: IProps) {

  const { selectedLanguage } = useAppTranslation();

  const { id, name, kcal, categoryLevel, timestamp } = foodRecord;

  return (
    <Container>
      <IconContainer>
        <IconImage source={TimeIcons['sunrise']} />
      </IconContainer>

      <RegistryDataContainer>
        <FoodName>{name}</FoodName>
        <FoodInfo>Alimentação Pesada | {dayjs(timestamp).locale(selectedLanguage).format('LT')}</FoodInfo>
        <FoodInfo>{kcal} kcal</FoodInfo>
      </RegistryDataContainer>

      <Icon name='smile' size={20} color={Colors.Primary} />
    </Container>
  )
}
