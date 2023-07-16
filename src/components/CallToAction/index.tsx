import Icon from '@expo/vector-icons/FontAwesome5';
import { BlockDescription, BlockTitle, Container, RightContentBox } from "./styles";
import Colors from '../../Colors';

interface IProps {
  title: string;
  description: string;
  handleOnPress(): void;
}

export default function CallToAction({ title, description, handleOnPress }: IProps) {
  return (
    <Container onPress={handleOnPress}>
      <Icon name="google-play" size={20} color={Colors.TextPrimary} />
      <RightContentBox>
        <BlockTitle>
          {title}
        </BlockTitle>
        <BlockDescription>
          {description}
        </BlockDescription>
      </RightContentBox>
    </Container>
  );
}
