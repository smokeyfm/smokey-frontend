import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      pink: {
        primary: string;
      };
      purple?: {
        light: string;
        primary: string;
      };
      gray: {
        primary: string;
        medium: string;
        light: string;
        background: string;
      };
      black: {
        primary: string;
        medium: string;
        light: string;
      };
      white: {
        primary: string;
        medium: string;
        light: string;
      };
      blue: {
        primary: string;
        medium: string;
        light: string;
      };
      brand: {
        bright?: string;
        primary: string;
        secondary: string;
        light: string;
      };
      todo: {
        primary: string;
        medium: string;
        light: string;
      };
      design: {
        primary: string;
        medium: string;
        light: string;
      };
      developed: {
        primary: string;
        medium: string;
        light: string;
      };
      red: {
        primary: string;
        medium: string;
        light: string;
      };
    };
  }
}
