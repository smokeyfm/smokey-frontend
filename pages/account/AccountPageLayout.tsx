import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { InputBase, ButtonBase } from "@material-ui/core";
import { pxPC } from "../../utils";
import { Layout } from "../../components";
import data from "./otherhistory.json";
const Content = styled.div`
  min-height: calc(100vh - 543px);
  position: relative;
  padding-bottom: ${pxPC(125)};
`;
const PageTitle = styled.div`
  position: absolute;
  left: ${pxPC(54)};
  top: ${pxPC(491)};
  font-size: 33px;
  line-height: 41px;
  color: #000;
  text-transform: uppercase;
  transform: rotate(-90deg);
  font-family: "Bebas Neue";
  &:after {
    position: absolute;
    content: "";
    left: 100%;
    width: ${pxPC(86)};
    height: 3px;
    background-color: #000;
    top: 40%;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${pxPC(123)};
  margin-right: ${pxPC(58)};
`;
const MyInput = styled(InputBase)`
  width: ${pxPC(312)};
  height: 24px;
  border-bottom: 2px solid #000;
`;
const MyInputLabel = styled.div`
  margin-left: ${pxPC(19)};
  font-size: 20px;
  line-height: 24px;
  height: 24px;
  color: #000;
  font-family: "Bebas Neue";
  text-transform: uppercase;
`;
const Container = styled.div`
  display: flex;
  padding-left: ${pxPC(96)};
  padding-right: ${pxPC(96)};
  justify-content: space-between;
  margin-top: ${pxPC(37)};
`;
const Sider = styled.div`
  display: flex;
  flex-direction: column;
  width: ${pxPC(100)};
`;
const MenuItem = styled.a`
  font-family: Roboto Condensed;
  color: #000;
  line-height: 125%;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: ${pxPC(8)};
  &:hover {
    text-decoration: underline;
  }
`;
const AccountPageLayout = (props: any) => {
  const { children } = props;
  return (
    <Layout>
      <Content>
        <PageTitle>account</PageTitle>
        <InputWrapper>
          <MyInput />
          <MyInputLabel>SEARCH orders</MyInputLabel>
        </InputWrapper>
        <Container>
          <Sider>
            <MenuItem>Order History</MenuItem>
            <MenuItem>My Style</MenuItem>
            <MenuItem>Payment Methods</MenuItem>
            <MenuItem>Account Details</MenuItem>
          </Sider>
          {children}
        </Container>
      </Content>
    </Layout>
  );
};
export default AccountPageLayout;
