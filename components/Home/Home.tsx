import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Layout, InfoBox, ProductList } from "../../components";
import { fetchPosts, fetchProducts } from "../../hooks";
import Banner from "./Banner";
import { Content } from "./Home.styles";
import LatestProducts from "./LatestProducts";
import MemberList from "./MemberList";
import Products from "./Products";
import PolProductList from "../../components/POLProductList";
import { useMediaQuery } from "react-responsive";
import MobileLatest from "./MobileLatest";
import data from "./home.json";
export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const memberList = isMobile ? null : <MemberList data={data.memberList} />;
  const mobileMemberList = !isMobile ? null : <MemberList data={data.memberList} />;
  const latestProducts = isMobile ? null : <LatestProducts data={data.latestProducts} />;
  const mobileLatest = isMobile ? (
    <MobileLatest data={data.hotDigs} title={"THE LATEST"}></MobileLatest>
  ) : null;
  const polProductList = isMobile ? null : <PolProductList data={data.hotDigs} title={"HOTDIGS"} />;
  const bigHotDig = isMobile ? null : <BigHotDig data={data.bigHotDig} />;
  return (
    <Layout>
      <Hero />
      <Content>
        {/* {memberList} */}
        <Products data={data.productList} title={"Live-Shopping"} />
        {/* {mobileMemberList} */}
        {advertList}
        {advertListMobile}
        {!productsAreLoading && polProductList}
        {banner}
      </Content>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts", 10], () => fetchPosts(10));
  await queryClient.prefetchQuery(["products", 1], () => fetchProducts(1));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}
