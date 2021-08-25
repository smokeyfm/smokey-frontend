import React from "react";
import {
  Container,
  Grid,
  LatestTitle,
  ProductBox,
  ProductImg,
  ProductTitle,
  ProductTitleBox,
  ProductRate,
  ProductDesc,
  ThreeDotWrapper,
  Dot1,
  Dot2,
  Dot3,
  ThreeDot,
  Price
} from "./MobileLatest.styles";
export interface MobileLatestProps {
  data: any;
  title: string;
}
const MobileLatest: React.FC<MobileLatestProps> = (props) => {
  const { title, data } = props;
  return (
    <Container>
      <LatestTitle>{title}</LatestTitle>
      <Grid>
        {data?.map((item: any, index: any) => (
          <ProductBox key={index}>
            <ProductImg src={item.img} />
            <ProductTitleBox>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductRate name="simple-controlled" size={"small"} value={item.rate} />
            </ProductTitleBox>
            <ProductDesc>{item.desc}</ProductDesc>
            <ThreeDotWrapper>
              <ThreeDot>
                <Dot1 as={"span"}></Dot1>
                <Dot2 as={"span"}></Dot2>
                <Dot3 as={"span"}></Dot3>
              </ThreeDot>
              <Price>{item.price}</Price>
            </ThreeDotWrapper>
          </ProductBox>
        ))}
      </Grid>
    </Container>
  );
};
export default MobileLatest;
