import React from "react";
import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        body {

          background-image:
          linear-gradient(180deg, rgba(136,6,146, .8) 0%, rgba(136,6,146, .6) 67.71%),
          url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80');
          background-blend-mode: overlay;

          background-size: cover;
          height: 944px;

        }
      `}
    />
  </>
);
