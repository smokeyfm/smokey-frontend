import * as React from "react";
import { useRouter } from "next/router";
import { Layout, AuthForm } from "../../components";
import { AuthFromType } from "../../components/AuthForm/constants";

const Authenticate = () => {
  const router = useRouter();
  const { formType } = router.query;
  return (
    <Layout>
      <AuthForm formType={formType as AuthFromType} />
    </Layout>
  );
};

export default Authenticate;
