import { Container, LoadingSpinner } from "./styles";

interface IFullScreenLoading {
  hideSpinner?: boolean;
}

export default function FullScreenLoading({ hideSpinner = false }: IFullScreenLoading) {
  return (
    <Container>
      {!hideSpinner && <LoadingSpinner />}
    </Container>
  )
}
