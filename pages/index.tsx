import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Layout, Header, InfoBox, ProductList } from "../components";
import { fetchPosts, fetchProducts } from "../hooks";
import BurgerSideMenu from '../components/sidebar/index'
import HomeComponent from "../components/Home";
import Head from 'next/head';
import Result from './api/hello'
import { server, client_id, user_id } from "../config";
const Home = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={'songs'} />
        <meta name='description' content={'songs'} />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="../style.css"/>
        <title>SmokeyFM</title>
      </Head>
      <Layout>
        <BurgerSideMenu />
        <HomeComponent  />
      </Layout>
    </>
  );
};
// export const getServerSideProps = async () => {
//   const res = await fetch(`${server}`+ `${client_id}`)
//   let songs = await res.json();
//   console.log(`*********************Array`, songs_Array)
  
//   return {
//     props: {
//       songs,
//     },
//   }
// }
// export async function getStaticProps(context) {
//   const res = await fetch(`${server}`+ `${client_id}`)
//   let data = await res.json();
//   console.log(`*********************Array`, data)
//   return {
//     props: {songs:data[0].tracks}, // will be passed to the page component as props
//   }
// }
// export async function getServerSideProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["posts", 10], () => fetchPosts(10));
//   await queryClient.prefetchQuery(["products", 1], () => fetchProducts(1));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default Home;
