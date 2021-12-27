import { useEffect } from "react";
import { useQuery } from "react-query";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Layout, InfoBox, ProductList } from "../components";
import { fetchStreams, fetchProducts, useProducts, useStreams } from "../../hooks";
import Hero from "./Hero";
import Banner from "./Banner";
import { Content } from "./Home.styles";
import LatestProducts from "./LatestProducts";
import MemberList from "./MemberList";
import { StreamList } from "../StreamList";
import PolProductList from "../PolProductList";
import { useMediaQuery } from "react-responsive";
import MobileLatest from "./MobileLatest";
import homeData from "./home.json";
export const Home = (props: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const {
    error: productError,
    status: productStatus,
    data: productData,
    isLoading: productsAreLoading,
    isSuccess: productIsSuccess
  }: { error: any; status: any; data: any; isLoading: boolean; isSuccess: boolean } = useProducts(
    1
  );

  const {
    error: streamError,
    status: streamStatus,
    data: streamData,
    isLoading: streamsAreLoading,
    isSuccess: streamIsSuccess
  }: { error: any; status: any; data: any; isLoading: boolean; isSuccess: boolean } = useStreams(1);

  const memberList = isMobile ? null : <MemberList data={homeData.memberList} />;
  const mobileMemberList = !isMobile ? null : <MemberList data={homeData.memberList} />;
  const advertList = isMobile ? null : <LatestProducts data={homeData.latestProducts} title="" />;
  const advertListMobile = isMobile ? (
    <MobileLatest data={homeData.hotDigs} title={""}></MobileLatest>
  ) : null;
  const polProductList = isMobile ? null : (
    // <PolProductList data={homeData.hotDigs} title={"New Drops This Week"} />
    <PolProductList data={productData} title={"New Drops This Week"} />
  );
  const banner = isMobile ? null : <Banner data={homeData.bigHotDig} />;

  useEffect(() => {
    console.log(streamData?.response_data, productData);
  }, []);

  return (
    <Layout>
      <Hero />
      <Content>
        {/* {memberList} */}
        <StreamList data={streamData?.response_data} title={"Live-Shopping"} />
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

  // await queryClient.prefetchQuery(["posts", 1], () => fetchPosts(1));
  await queryClient.prefetchQuery(["streams", 1], () => fetchStreams(1));
  await queryClient.prefetchQuery(["products", 1], () => fetchProducts(1));

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}
