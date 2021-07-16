import styled from "@emotion/styled";
import { pxIpone, pxPC } from "../../utils";
export const Content = styled.div`
  padding: 0 ${pxPC(46)};
  @media (max-width: 375px) {
    padding: 0 ${pxIpone(15)};
  }
`;
