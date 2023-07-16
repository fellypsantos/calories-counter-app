import { useMemo } from 'react';
import { useNavigation } from "@react-navigation/native";
import { ButtonAddFoodRegistry, Container, PhraseRegistryCount } from "./styles";
import Icon from '@expo/vector-icons/FontAwesome5';
import Colors from "../../Colors";
import { useAppTranslation } from "../../hooks/translation";
import { useFoodRecord } from '../../hooks/food';
import { StackNavigationProps } from '../../Tabs/Home';

export default function TopBarAddFoodRegistry() {
  const navigation = useNavigation<StackNavigationProps>();
  const { Translate, selectedLanguage } = useAppTranslation();
  const { foodHistory } = useFoodRecord();

  const registryCountMessage = useMemo(() => {

    const translatedCountTemplate = Translate('CountTotalMealsRegistered');

    const registryWord = foodHistory.length === 1
      ? Translate('RegistrySingular')
      : Translate('RegistryPlural');

    const replacedTemplate = translatedCountTemplate
      .replace('**COUNT**', foodHistory.length.toString())
      .replace('**REGISTRY**', registryWord);

    return replacedTemplate;
  }, [selectedLanguage, foodHistory]);

  return (
    <Container>
      <PhraseRegistryCount>
        {foodHistory.length === 0
          ? Translate('CountTotalMealsEmpty')
          : registryCountMessage}
      </PhraseRegistryCount>

      <ButtonAddFoodRegistry
        onPress={() => navigation.navigate('AddFoodRegistry')}>
        <Icon name="plus-circle" size={20} color={Colors.Primary} />
      </ButtonAddFoodRegistry>
    </Container>
  );
}
