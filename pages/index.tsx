import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Layout, Header, InfoBox, ProductList } from "../components";
import { fetchPosts, fetchProducts } from "../hooks";
import BurgerSideMenu from '../components/sidebar/Sidebar'
import HomeComponent from "../components/Home";
import Head from 'next/head';
import Result from './api/hello'

const Home = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={'songs'} />
        <meta name='description' content={'songs'} />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>SmokeyFM</title>
      </Head>
      <Layout>
        <BurgerSideMenu />
        <HomeComponent />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts", 10], () => fetchPosts(10));
  await queryClient.prefetchQuery(["products", 1], () => fetchProducts(1));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
