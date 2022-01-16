import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import {
  fetchStreams,
  fetchProducts,
  fetchVariants,
  useProducts,
  useStreams,
  useVariants
} from "../../hooks";
import { Layout, LoadingWrapper, Loading } from "../components";
import { useProduct, fetchProduct } from "../../hooks/useProduct";
import { useMutation, useQueryClient } from "react-query";
import { addItemToCart } from "../../hooks/useCart";
import { QueryKeys } from "../../hooks/queryKeys";
import * as tracking from "../../config/tracking";
import LatestProducts from "../Home/LatestProducts";
import PolProductList from "../PolProductList";
import { useMediaQuery } from "react-responsive";
import homeData from "../Home/home.json";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
  ImageWithZoom
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
// import ProductCard from "../components";

import {
  ProductContainer,
  ProductImageCarousel,
  ProductInfoBox,
  ProductDescription,
  Detail,
  Price,
  SizesTitle,
  SizesPerPack,
  Size,
  SizeQty,
  SizeTitle,
  ColorsTable,
  ColorsHead,
  ColorsTH,
  ColorsBody,
  ColorsRow,
  ColorsCell
} from "./ProductDetails.styles";

const settings = {
  speed: 500,
  dots: false,
  Infinite: false
};

interface ColorOptionType {
  name: string;
  quantity: number;
}

const productColors: ColorOptionType[] = [
  {
    name: "Yellow Rod",
    quantity: 2
  },
  {
    name: "Carnelian",
    quantity: 2
  }
];

export const ProductDetails = ({ wholesale }: any) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { asPath: productSlug } = router;
  // console.log(productSlug);
  const { data: thisProduct, isLoading, isSuccess } = useProduct(`${productSlug.replace("/", "")}`);
  const thisProductId = thisProduct?.data.id || "";
  const queryClient = useQueryClient();
  const [colorOptions, setColorOptions] = useState<any>(productColors);

  const {
    error: productsError,
    status: productsStatus,
    data: productsData,
    isLoading: productsAreLoading,
    isSuccess: productsAreSuccess
  }: { error: any; status: any; data: any; isLoading: boolean; isSuccess: boolean } = useProducts(
    1
  );
  const randomNextProductId = productsAreSuccess
    ? productsData.data[Math.floor(Math.random() * productsData.data?.length)].id
    : 1;

  const {
    error: variantsError,
    status: variantsStatus,
    data: variantsData,
    isLoading: variantsAreLoading,
    isSuccess: variantsAreSuccess
  } = useVariants(1, thisProductId);

  const polProductList = isMobile ? null : <PolProductList data={productsData} title={"HOTDIGS"} />;
  const latestProducts = isMobile ? null : (
    <LatestProducts data={homeData.latestProducts} title="" />
  );
  const addToCart = useMutation(addItemToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.CART);
    }
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    const thisProductId = thisProduct?.data.id;
    console.log(thisProductId);
    const productId: number = parseInt(`${thisProductId}`);
    const { key } = event;

    switch (key) {
      case "ArrowLeft":
        const prevProductId = productId - 1;

        fetchProduct(`${prevProductId}`)
          .then((nextProduct) => {
            router.push(`/${nextProduct?.data?.attributes?.slug}`);
          })
          .catch(() => {
            /* product not found */
            fetchProduct(randomNextProductId).then((nextProduct) => {
              router.push(`/${nextProduct?.data?.attributes?.slug}`);
            });
          });
        break;
      case "ArrowRight":
        const nextProductId = productId + 1;

        fetchProduct(`${nextProductId}`)
          .then((nextProduct) => {
            router.push(`/${nextProduct?.data?.attributes?.slug}`);
          })
          .catch(() => {
            /* product not found */
            fetchProduct(randomNextProductId).then((nextProduct) => {
              router.push(`/${nextProduct?.data?.attributes?.slug}`);
            });
          });
        break;
      default:
        break;
    }
  };

  const renderColorOptions = useCallback(() => {
    let variants: any = [];
    const foundVariants = thisProduct?.included?.some((elem) => {
      if (elem.type == "option_values") {
        variants.push(elem);
      }
    });
    console.log("PRODUCT: ", thisProduct, "VARIANTS: ", variantsData);

    // return thisProduct?.data.relationships.variants.data.map((item: ColorOptionType, index: number) => {
    //   console.log("row: ", item);
    //   return (
    //     <ColorsRow key={`${index}-row`}>
    //       <ColorsCell>{item.name}</ColorsCell>
    //       <ColorsCell>-</ColorsCell>
    //       <ColorsCell>
    //         <input value={item.quantity} type="number" min="1" max="99" onChange={(e: any) => setColorOptions([...colorOptions, ])} />
    //       </ColorsCell>
    //       <ColorsCell>+</ColorsCell>
    //       <ColorsCell>24</ColorsCell>
    //       <ColorsCell>$720</ColorsCell>
    //     </ColorsRow>
    //   );
    // });
  }, [colorOptions, thisProduct]);

  useEffect(() => {
    if (isSuccess) {
      // // On page load, set focus on the product contaniner, because otherwise the arrow keys (left/right) won't work
      // const productContainer = Array.from(
      //   document.getElementsByClassName("product-container")
      // ).shift();

      // if (productContainer) {
      //   (productContainer as HTMLElement).focus();
      // }
      tracking.trackEvent({
        action: tracking.Action.VIEW_PRODUCT,
        category: tracking.Category.PRODUCT_DETAIL,
        label: thisProduct?.data?.attributes?.name
      });
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isSuccess, handleKeyPress]);

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (!thisProduct) {
    return (
      <Layout>
        <LoadingWrapper>
          <h3>No Product Found</h3>
        </LoadingWrapper>
      </Layout>
    );
  }

  if (isSuccess) {
    // const variants = thisProduct?.data.relationships.variants.data;

    // const handleAddToCart = () =>
    //   addToCart.mutate({
    //     variant_id: Array.isArray(variants) ? variants[0].id : "",
    //     quantity: 1
    //   });

    const imageSource =
      Array.isArray(thisProduct?.included) && thisProduct?.included[0]?.attributes?.styles?.[2].url;
    const source = imageSource
      ? `http://localhost:8080${imageSource}`
      : "https://via.placeholder.com/400x600";
    // const source = "https://via.placeholder.com/400x600";

    // const productImgs = thisProduct.relationships?.images?.data[0]?.id;
    // const foundImg = thisProduct?.included.filter((e: any) => e["id"] == productImg);
    // const imgUrl = foundImg[0]?.attributes?.styles[4].url;
    // const imgSrc = productImg ? `${process.env.SPREE_API_URL}${imgUrl}` : defaultImg;

    // const renderProductImgs = () => {
    //   return productImgs.map((item, index) => {

    //     return (
    //       <Slide index={0} style={{ height: "500px" }}>
    //         <ImageWithZoom src={source} />
    //       </Slide>
    //     )
    //   });
    // }

    return (
      <Layout>
        <ProductContainer className="product-container">
          <ProductImageCarousel>
            <CarouselProvider
              naturalSlideWidth={600}
              naturalSlideHeight={600}
              totalSlides={3}
              isIntrinsicHeight
              touchEnabled
            >
              <Slider className="slider">
                <Slide index={1} style={{ height: "500px" }}>
                  <ImageWithZoom src={source} />
                </Slide>
                <Slide index={2} style={{ height: "500px" }}>
                  <ImageWithZoom src={source} />
                </Slide>
              </Slider>

              <ButtonBack>Back</ButtonBack>
              <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
          </ProductImageCarousel>

          <ProductInfoBox>
            <ProductDescription>
              <h2>{thisProduct?.data?.attributes?.name}</h2>
              <p>{thisProduct?.data?.attributes?.description}</p>
              <hr />
              {wholesale && <p>Price Per Pack</p>}
              <Price>${thisProduct?.data?.attributes?.price}</Price>

              {wholesale && (
                <>
                  <SizesTitle>Sizes Per Pack</SizesTitle>
                  <SizesPerPack>
                    <Size>
                      <SizeQty>2</SizeQty>
                      <SizeTitle>xs</SizeTitle>
                    </Size>
                    <Size>
                      <SizeQty>2</SizeQty>
                      <SizeTitle>sm</SizeTitle>
                    </Size>
                    <Size>
                      <SizeQty>2</SizeQty>
                      <SizeTitle>md</SizeTitle>
                    </Size>
                    <Size>
                      <SizeQty>2</SizeQty>
                      <SizeTitle>lg</SizeTitle>
                    </Size>
                    <Size>
                      <SizeQty>2</SizeQty>
                      <SizeTitle>xl</SizeTitle>
                    </Size>
                  </SizesPerPack>
                </>
              )}

              {wholesale && (
                <ColorsTable>
                  <ColorsHead>
                    <ColorsTH>
                      <ColorsCell>Colors</ColorsCell>
                      <ColorsCell>Pack Qty</ColorsCell>
                      <ColorsCell>Pieces Qty</ColorsCell>
                      <ColorsCell>Pack Price</ColorsCell>
                    </ColorsTH>
                  </ColorsHead>
                  <ColorsBody>{renderColorOptions(colorOptions)}</ColorsBody>
                </ColorsTable>
                // <table>
                //   <thead>
                //     <tr>
                //       <th>Colors</th>
                //       <th>Pack Qty</th>
                //       <th>Pieces Qty</th>
                //       <th>Pack Price</th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     <tr>
                //       <td>Yellow Rod</td>
                //       <td>- 4 +</td>
                //       <td>24</td>
                //       <td>$720</td>
                //     </tr>
                //     <tr>
                //       <td>Carnelian</td>
                //       <td>- 4 +</td>
                //       <td>24</td>
                //       <td>$720</td>
                //     </tr>
                //   </tbody>
                // </table>
              )}

              {/* RETAIL COLOR */}
              {!wholesale && (
                <select>
                  <option selected>Color</option>
                  <option>Blue</option>
                  <option>Beige</option>
                  <option>Pink</option>
                </select>
              )}

              {/* RETAIL SIZE */}
              {!wholesale && (
                <div className="size-selection">
                  <button className="">XS</button>
                  <button className="">S</button>
                  <button className="">M</button>
                  <button className="">L</button>
                  <button className="">XL</button>
                </div>
              )}

              <button className="">add to cart</button>
            </ProductDescription>

            <div>
              <Detail>Product Details</Detail>
              <p>FABRIC : 100% POLYESTER BUST : 29”LENGTH : 25 1/2”</p>
              <Detail>Model Info</Detail>
              <p>
                Model info goes here:
                <br />
                Height: 5'8''
                <br />
                Bust: 32
                <br />
                Waist: 24''
                <br />
                Hip: 34"
                <br />
                Wearing Size: XS
              </p>
            </div>
          </ProductInfoBox>
        </ProductContainer>

        <h3>you may also like:</h3>
        {polProductList ? polProductList : <></>}

        <style jsx>
          {`
            .slider-wrapper {
              width: 760px;
              margin: auto;
            }
            .slick-slide {
              text-align: center;
              position: relative;
            }
            .slick-slide:focus {
              outline: none;
            }
            .slick-slide-title {
              text-transform: capitalize;
            }
            .slick-slide-image {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
                0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
            }
            .slick-slide-label {
              color: #fff;
              padding: 10px;
              position: absolute;
              left: 0px;
              font-size: 1.5em;
              bottom: 0px;
              width: 100%;
            }
            .slick-prev:before,
            .slick-next:before {
              color: #777777;
            }
          `}
        </style>
      </Layout>
    );
  }
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(["posts", 1], () => fetchPosts(1));
  await queryClient.prefetchQuery(["streams", 1], () => fetchStreams(1));
  await queryClient.prefetchQuery(["products", 1], () => fetchProducts(1));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}
