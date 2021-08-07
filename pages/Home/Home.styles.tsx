import styled from "@emotion/styled";
import { pxIphone, pxPC } from "../../utils";
export const Content = styled.div`
  padding: 0 ${pxPC(46)};
  @media (max-width: 375px) {
    padding: 0 ${pxIphone(15)};
  }
`;
