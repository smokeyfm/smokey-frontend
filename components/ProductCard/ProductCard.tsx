import React from "react";
import { useRouter } from "next/router";

import {
  ProductCardWrapper,
  ProductImgWrapper,
  ProductImg,
  ProductTitle,
  ProductDesc,
  ProductFooter,
  ProductFooterLeft,
  ProductFooterRight,
  // ProductRate,
  Price,
  ThreeDot,
  Dot1,
  Dot2,
  Dot3
} from "./ProductCard.styles";

export const ProductCard = ({ imgSrc, item }: any) => {
  const router = useRouter();
  // console.log(item);
  return (
    <ProductCardWrapper onClick={(e) => router.push(`${item.attributes.slug}`)}>
      <>
        <ProductImgWrapper>
          <ProductImg src={imgSrc} />
        </ProductImgWrapper>
        <ProductFooter>
          <ProductFooterLeft>
            <ProductTitle>{item.attributes.name}</ProductTitle>
            {/* <ProductDesc>{item.attributes.description}</ProductDesc> */}
            <ThreeDot>
              <Dot1 as={"span"}></Dot1>
              <Dot2 as={"span"}></Dot2>
              <Dot3 as={"span"}></Dot3>
            </ThreeDot>
          </ProductFooterLeft>
          <ProductFooterRight>
            {/* <ProductRate name="simple-controlled" value={item.attributes.rate} /> */}
            <Price>${item.attributes.price}</Price>
          </ProductFooterRight>
        </ProductFooter>
      </>
    </ProductCardWrapper>
  );
};
