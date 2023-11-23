import React from "react";
import styled from "@emotion/styled";
import Lottie from "react-lottie";
import loadingAnimation from "./loading.json";

export const LoadingWrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div svg g g g path {
    /* stroke: ${(p) => p.theme.isDarkMode ? p.theme.colors.white.primary : p.theme.colors.black.primary}; */
    stroke: "white";
  }
`;

export const LoadingIcon = styled.i`
  margin: 0 auto;
`;

export const Loading = () => {
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      <Lottie options={animationOptions} width={100} height={30} />
    </>
  );
};
