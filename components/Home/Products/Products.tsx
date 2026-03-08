import React from "react";
import { ProductCard } from "../../ProductCard";
import { IProducts } from "@spree/storefront-api-v2-sdk/types/interfaces/Product";
import Link from "next/link";

export interface ProductsProps {
  products: IProducts;
  title: string;
  /** Number of products to display (default: 6) */
  limit?: number;
  /** Link target for "View All" button (default: /browse) */
  href?: string;
  /** Label for the CTA button (default: "View All") */
  ctaLabel?: string;
}

const Products: React.FC<ProductsProps> = ({
  products,
  title,
  limit = 6,
  href = "/browse",
  ctaLabel = "View All"
}) => {
  const optionValuesLookup =
    products?.included
      ?.filter((item) => item.type === "option_value")
      .reduce((acc: any, curr) => {
        const optionTypeId = curr.relationships.option_type.data.id;
        if (!acc[optionTypeId]) acc[optionTypeId] = [];
        acc[optionTypeId].push(curr.attributes);
        return acc;
      }, {}) || {};

  const items = products?.data?.slice(0, limit) || [];

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-display text-title-lg text-foreground sm:text-title-xl">
          {title}
        </h2>
        <Link
          href={href}
          className="text-sm text-brand hover:underline transition-colors no-underline"
        >
          {ctaLabel}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-5">
        {items.map((item: any, index: number) => {
          const defaultImg =
            "https://static-assets.strikinglycdn.com/images/ecommerce/ecommerce-default-image.png";
          const productImg = item.relationships?.images?.data[0]?.id;
          const allImages =
            products?.included?.filter((e: any) => e.type === "image") || [];
          const foundImg = allImages.filter((e: any) => e.id === productImg);
          const imgUrl = foundImg[0]?.attributes?.styles[4]?.url;
          const imgSrc = productImg
            ? `${process.env.NEXT_PUBLIC_SPREE_API_URL}${imgUrl}`
            : defaultImg;

          const optionTypes = item.relationships?.option_types?.data || [];
          const productOptions = optionTypes
            .map((ot: any) => optionValuesLookup[ot.id])
            .filter(Boolean);

          return (
            <ProductCard
              key={item.id || index}
              item={item}
              imgSrc={imgSrc}
              opts={productOptions}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Products;
