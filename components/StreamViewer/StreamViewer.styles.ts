import styled from "@emotion/styled";

export const StreamViewerWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-contents: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background red;
  opacity: 0.5;
  backdrop-filter: blur(15px);
`;

export const StreamVideo = styled.video`
  // width: 50%;
  // height: 50%;
  width: 800px;
  max-width: 100%;
  cursor: pointer;
  padding-top: 40px;
  padding-bottom: 40px;
`;
