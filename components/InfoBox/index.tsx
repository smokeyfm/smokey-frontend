import styled from '@emotion/styled';
import React from "react";
const Div = styled.div`
margin-top: 20px;
margin-bottom: 20px;
padding-top: 20px;
padding-bottom: 20px;
border-top: 1px solid #ececec;
border-bottom: 1px solid #ececec;
`
const InfoBox = ({ children }) => (
  <Div>
    {children}
  </Div>
);

export { InfoBox };
