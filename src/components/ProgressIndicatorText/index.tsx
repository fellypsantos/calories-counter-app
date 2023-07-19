import { useAppTranslation } from '../../hooks/translation';
import { Container, Text } from './styles';

interface IProgressIndicatorProps {
  value: number;
}

export default function ProgressIndicatorText({ value }: IProgressIndicatorProps) {
  const { Translate } = useAppTranslation();

  return (
    <Container>
      <Text>{Translate('Updater.Downloading')}: {value.toFixed(2)}%</Text>
    </Container>
  );
}
