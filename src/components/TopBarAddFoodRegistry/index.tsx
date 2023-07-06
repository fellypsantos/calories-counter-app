import { useNavigation } from "@react-navigation/native";
import { ButtonAddFoodRegistry, Container, PhraseRegistryCount } from "./styles";
import Icon from '@expo/vector-icons/FontAwesome5';
import Colors from "../../Colors";

export default function TopBarAddFoodRegistry() {
  const navigation = useNavigation();
  const foodHistoryLength = 0;

  return (
    <Container>
      <PhraseRegistryCount>
        {foodHistoryLength === 0 ? 'Cadastre uma refeição.' : 'Já foram anotados 2 registros hoje.'}
      </PhraseRegistryCount>

      <ButtonAddFoodRegistry
        onPress={() => navigation.navigate('AddFoodRegistrySection')}>
        <Icon name="plus-circle" size={20} color={Colors.Primary} />
      </ButtonAddFoodRegistry>
    </Container>
  );
}
