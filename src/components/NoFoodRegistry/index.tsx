import Icon from '@expo/vector-icons/FontAwesome5';
import { Container, NoRegistryLabel } from "./styles";

import Colors from '../../Colors';
import { useAppTranslation } from '../../hooks/translation';

export default function NoFoodRegistry({ hidden }: IVisibility) {
  const { Translate } = useAppTranslation();
  return (
    <Container hidden={hidden}>
      <Icon name="mug-hot" size={30} color={Colors.TextPrimary} />
      <NoRegistryLabel>{Translate('NoRecordsFound')}</NoRegistryLabel>
    </Container>
  );
}
