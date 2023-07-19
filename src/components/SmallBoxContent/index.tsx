import {
  Container,
  Title,
  MainText,
} from './styles';

interface ISmallBoxContentProps {
  title: string;
  content: string;
}

export default function SmallBoxContent({ title, content }: ISmallBoxContentProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <MainText>{content}</MainText>
    </Container>
  )
}
