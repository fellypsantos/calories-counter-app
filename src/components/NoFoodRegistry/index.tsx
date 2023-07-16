import Icon from '@expo/vector-icons/FontAwesome5';
import { Container, NoRegistryLabel } from "./styles";

import Colors from '../../Colors';

export default function NoFoodRegistry({ hidden }: IVisibility) {
  return (
    <Container hidden={hidden}>
      <Icon name="mug-hot" size={30} color={Colors.TextPrimary} />
      <NoRegistryLabel>Nenhum registro</NoRegistryLabel>
    </Container>
  );
}
