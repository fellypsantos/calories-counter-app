import Icon from '@expo/vector-icons/FontAwesome5';
import { BlockDescription, BlockTitle, Container, RightContentBox } from "./styles";
import Colors from '../../Colors';

interface IProps {
  handleOnPress(): void;
}

export default function CallToAction({ handleOnPress }: IProps) {
  return (
    <Container onPress={handleOnPress}>
      <Icon name="google-play" size={20} color={Colors.TextPrimary} />
      <RightContentBox>
        <BlockTitle>
          Mais apps
        </BlockTitle>
        <BlockDescription>
          Descrição sobre acessar mais apps.
        </BlockDescription>
      </RightContentBox>
    </Container>
  );
}
