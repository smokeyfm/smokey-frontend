import React from "react";
import { Layout, Header, PostList } from "../components";

const ClientOnly = () => {
  return (
    <Layout>
      <Header />
      <PostList />
    </Layout>
  );
};

export default ClientOnly;
