import React from "react";
import { Container, Title, Img, Btn } from "./BigHotDig.styles";
export type bigHotDig = {
  img: string;
};
export interface BigHotDigProps {
  data: bigHotDig;
}
const BigHotDig: React.FC<BigHotDigProps> = (props) => {
  const { data } = props;
  return (
    <Container>
      <Title>HOT DIGS</Title>
      <Img src={data.img} />
      <Btn>BUTTON</Btn>
    </Container>
  );
};
export default BigHotDig;
