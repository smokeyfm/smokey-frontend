import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      blue: {
        primary: string;
        medium: string;
      };
      pink: {
        primary: string;
      };
      white: {
        primary: string;
      };
      gray: {
        primary: string;
        medium: string;
        background: string;
      };
    };
  }
}
