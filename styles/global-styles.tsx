import React from "react";
import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        body {
          background: #ce8dd0;



          background: url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80') ;
          mix-blend-mode: overlay;
          background-size: cover;
          width: 1425px;
          aspect-ratio: auto 1425 / 944;
          height: 944px;
        }
      `}
    />
  </>
);
