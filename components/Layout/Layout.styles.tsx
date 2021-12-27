import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 235px);
`;
export const Content = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const CameraIcon = styled.img`
  width: 11px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 20.71px;
    height: auto;
    margin-right: 7.76px;
  }
`;
export const FacebookIcon = styled.img`
  width: 6.81px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 13.63px;
    height: auto;
    margin-right: 7.76px;
  }
`;
export const PlayIcon = styled.img`
  width: 12.29px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 24.59px;
    height: auto;
    margin-right: 7.76px;
  }
`;
export const CircleIcon = styled.img`
  width: 10.35px;
  height: auto;
  @media (max-width: 375px) {
    width: 20.71px;
    height: auto;
  }
`;

export const Logo = styled.div`
  width: 181px;
  height: 45px;
  font-size: 24px;
  line-height: 45px;
  border: 1px solid #969696;
  color: #fff;
  font-weight: bold;
  font-family: Montserrat;
  text-align: center;
  margin-bottom: 60px;
  @media (max-width: 375px) {
    width: 80px;
    height: 19.83px;
    font-size: 10px;
    line-height: 19.83px;
    margin-bottom: 55.07px;
  }
`;
