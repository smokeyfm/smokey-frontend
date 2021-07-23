import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components";
import { AuthFormType } from "../../components/AuthForm/constants";
import { AuthForm } from "../../components/AuthForm";

const Authenticate = () => {
  const router = useRouter();
  const { formType } = router.query;
  return (
    <Layout>
      <AuthForm formType={formType as AuthFormType} />
    </Layout>
  );
};

export default Authenticate;
