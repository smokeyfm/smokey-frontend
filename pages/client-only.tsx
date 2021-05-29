import React from "react";
import { Layout, Header, InfoBox, PostList } from "../components";

const ClientOnly = () => {
  return (
    <Layout>
      <Header />
      <PostList />
    </Layout>
  );
};

export default ClientOnly;
