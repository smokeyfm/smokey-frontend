import React from "react";
import { RetailProductDetails } from "./RetailProductDetails";

interface ProductDetailsProps {
  props: any;
}

export const ProductDetails = ({ props }: ProductDetailsProps) => {
  return <RetailProductDetails {...props} />;
};
