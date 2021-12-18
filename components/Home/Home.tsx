import { useEffect } from "react";
import { useQuery } from "react-query";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Layout, InfoBox, ProductList } from "../components";
import { fetchStreams, fetchProducts, useProducts, useStreams } from "../../hooks";
import Banner from "./Banner";
import BigHotDig from "./BigHotDig";
import { Content } from "./Home.styles";
import LatestProducts from "./LatestProducts";
import MemberList from "./MemberList";
import { StreamList } from "./StreamList";
import PolProductList from "../../components/POLProductList";
import { useMediaQuery } from "react-responsive";
import MobileLatest from "./MobileLatest";
import homeData from "./home.json";
export const Home = (props: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const memberList = isMobile ? null : <MemberList data={homeData.memberList} />;
  const mobileMemberList = !isMobile ? null : <MemberList data={homeData.memberList} />;
  const latestProducts = isMobile ? null : <LatestProducts data={homeData.latestProducts} />;
  const mobileLatest = isMobile ? (
    <MobileLatest data={homeData.hotDigs} title={"THE LATEST"}></MobileLatest>
  ) : null;
  const polProductList = isMobile ? null : (
    <PolProductList data={homeData.hotDigs} title={"HOTDIGS"} />
  );
  const bigHotDig = isMobile ? null : <BigHotDig data={homeData.bigHotDig} />;

  const {
    error: productError,
    status: productStatus,
    data: productData,
    isLoading: productIsLoading,
    isSuccess: productIsSuccess
  }: { error: any; status: any; data: any; isLoading: boolean; isSuccess: boolean } = useProducts(
    1
  );

  const {
    error: streamError,
    status: streamStatus,
    data: streamData,
    isLoading: streamIsLoading,
    isSuccess: streamIsSuccess
  }: { error: any; status: any; data: any; isLoading: boolean; isSuccess: boolean } = useStreams(1);

  useEffect(() => {
    console.log(streamData?.response_data, productData);
  }, []);

  return (
    <Layout>
      <Banner />
      <Content>
        {/* {memberList} */}
        <StreamList data={streamData?.response_data} title={"Live-Shopping"} />
        {/* {mobileMemberList} */}
        {latestProducts}
        {mobileLatest}
        {polProductList}
        {bigHotDig}
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
