import React from "react";
import { Container } from "./styles";

interface IReactElement {
  children: React.ReactNode,
}

export default function ScrollViewContainer({ children }: IReactElement) {
  return <Container>{children}</Container>
}
