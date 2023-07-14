import { useMemo } from 'react';
import dayjs from "dayjs";
import Colors from "../../Colors";
import { IFoodRecord } from "../../interfaces/IFoodRecord";
import { Container, FoodInfo, FoodName, IconContainer, IconImage, RegistryDataContainer } from "./styles";
import Icon from '@expo/vector-icons/FontAwesome5';
import { useAppTranslation } from "../../hooks/translation";
import { ImageSourcePropType } from 'react-native';

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

  const { Translate, selectedLanguage } = useAppTranslation();

  const { id, name, kcal, categoryLevel, timestamp } = foodRecord;

  const categoryLevelMessage = useMemo(() => {

    if (categoryLevel === 1) return Translate('Food.Light');
    if (categoryLevel === 2) return Translate('Food.Moderate');
    if (categoryLevel === 3) return Translate('Food.Heavy');
  }, [foodRecord, selectedLanguage]);

  const categoryLevelIcon = useMemo(() => {

    if (categoryLevel === 1) return 'smile';
    if (categoryLevel === 2) return 'exclamation-triangle';
    if (categoryLevel === 3) return 'sad-tear';
  }, [foodRecord]);

  const timestampIcon = useMemo<ImageSourcePropType>(() => {

    const time = parseInt(dayjs(timestamp).format('HH'), 10);

    if (time >= 6 && time < 12) return TimeIcons.sunrise;
    if (time >= 12 && time < 18) return TimeIcons.sun;
    if (time >= 18 && time <= 23 || time >= 0 && time < 6) return TimeIcons.moon;
  }, [foodRecord]);

  return (
    <Container>
      <IconContainer>
        <IconImage source={timestampIcon} />
      </IconContainer>

      <RegistryDataContainer>
        <FoodName>{name}</FoodName>
        <FoodInfo>{categoryLevelMessage} | {dayjs(timestamp).locale(selectedLanguage).format('LT')}</FoodInfo>
        <FoodInfo>{kcal} kcal</FoodInfo>
      </RegistryDataContainer>

      <Icon name={categoryLevelIcon} size={20} color={Colors.Primary} />
    </Container>
  )
}
