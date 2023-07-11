import { useMemo } from 'react';
import { useNavigation } from "@react-navigation/native";
import { ButtonAddFoodRegistry, Container, PhraseRegistryCount } from "./styles";
import Icon from '@expo/vector-icons/FontAwesome5';
import Colors from "../../Colors";
import { useAppTranslation } from "../../hooks/translation";

export default function TopBarAddFoodRegistry() {
  const navigation = useNavigation();
  const { Translate, selectedLanguage } = useAppTranslation();
  const foodHistoryLength = 1;

  const registryCountMessage = useMemo(() => {

    const translatedCountTemplate = Translate('CountTotalMealsRegistered');

    const registryWord = foodHistoryLength === 1
      ? Translate('RegistrySingular')
      : Translate('RegistryPlural');

    const replacedTemplate = translatedCountTemplate
      .replace('**COUNT**', foodHistoryLength.toString())
      .replace('**REGISTRY**', registryWord);

    return replacedTemplate;
  }, [selectedLanguage]);

  return (
    <Container>
      <PhraseRegistryCount>{registryCountMessage}</PhraseRegistryCount>

      <ButtonAddFoodRegistry
        onPress={() => navigation.navigate('AddFoodRegistry')}>
        <Icon name="plus-circle" size={20} color={Colors.Primary} />
      </ButtonAddFoodRegistry>
    </Container>
  );
}
