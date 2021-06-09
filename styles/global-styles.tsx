import React from 'react';
import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        body {
          background: #ce8dd0;
        }
      `}
    />
  </>
);
