import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Layout, InfoBox, ProductList } from "../../components";
import { fetchPosts, fetchProducts } from "../../hooks";
import Banner from "./Banner";
import BigHotDig from "./BigHotDig";
import { Content } from "./Home.styles";
import LatestProducts from "./LatestProducts";
import MemberList from "./MemberList";
import Products from "./Products";
import PolProductList from "../../components/POLProductList";
import { useMediaQuery } from "react-responsive";
import MobileLatest from "./MobileLatest";
import data from "./home.json";
const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <Layout>
      <Banner />
      <Content>
        {isMobile ? null : <MemberList data={data.memberList} />}
        <Products data={data.productList} title={"Live-Shopping"} />
        {!isMobile ? null : <MemberList data={data.memberList} />}
        {isMobile ? null :<LatestProducts data={data.latestProducts} />}
        {isMobile ?<MobileLatest data={data.hotDigs} title={'THE LATEST'}></MobileLatest>:null}
        {isMobile ? null :<PolProductList data={data.hotDigs} title={"HOTDIGS"} />}
        {isMobile ? null : <BigHotDig data={data.bigHotDig} />}
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

export default Home;
