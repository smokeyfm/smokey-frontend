import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { AuthFormType } from "../components/AuthForm/constants";
import { AuthForm } from "../components/AuthForm";

const Authenticate = () => {
  const router = useRouter();
  const { formType } = router.query;
  return (
    <Layout>
      <AuthForm formType={AuthFormType.reset_password} />
    </Layout>
  );
};

export default Authenticate;
