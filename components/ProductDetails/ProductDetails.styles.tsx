import styled from "@emotion/styled";

export const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`;

export const ProductImageCarousel = styled.div`
  width: 40%;
  height: auto;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ProductInfoBox = styled.div`
  margin: 2%;
`;

export const ProductDescription = styled.div`
  text-align: center;
  max-width: 400px;
`;

export const Detail = styled.h3`
  @media screen and (max-width: 800px) {
    font-size: 16px;
    text-align: center;
  }
`;

export const Price = styled.h1``;

export const SizesTitle = styled.p`
  text-align: left;
`;

export const SizesPerPack = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
`;

export const Size = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  border: 1px solid ${(p) => p.theme.colors.black.light};
  margin: 0 10px 0 0;
  &:last-child {
    margin: 0;
  }
`;

export const SizeQty = styled.div`
  border-right: 1px solid ${(p) => p.theme.colors.black.light};
  // padding: 4px 6px;
`;

export const SizeTitle = styled.div`
  // padding: 4px 6px;
  background: ${(p) => p.theme.colors.gray.background};
  text-transform: uppercase;
`;

// export const ColorsTable = styled.table``;

// export const ColorsHead = styled.thead``;

// export const ColorsTH = styled.th``;

// export const ColorsBody = styled.tbody``;

// export const ColorsRow = styled.tr``;

// export const ColorsCell = styled.td``;

export const ColorsTable = styled.div`
  margin: 40px 0 40px 0;
`;

export const ColorsHead = styled.div``;

export const ColorsTH = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  background: ${(p) => p.theme.colors.brand.primary};
  color: ${(p) => p.theme.colors.white.primary};
`;

export const ColorsBody = styled.div`
  border-left: 1px solid ${(p) => p.theme.colors.black.light};
  border-right: 1px solid ${(p) => p.theme.colors.black.light};
  border-bottom: 1px solid ${(p) => p.theme.colors.black.light};
`;

export const ColorsRow = styled.div`
  display: grid;
  grid-template-columns: 37.5% 5% 5% 5% 20% 25%;
`;

export const ColorsCell = styled.div`
  padding: 4px 6px;
  & input {
    width: 100%;
    border: 0;
    background: transparent;
    &:focus {
      outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  & input[type="number"] {
    -moz-appearance: textfield;
  }
`;
