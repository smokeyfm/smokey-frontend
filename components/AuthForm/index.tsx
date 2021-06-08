import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../../components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "@emotion/styled";
import {
  AuthFormType,
  loginForm,
  signupForm,
  forgotPasswordForm,
  updatePasswordForm,
  updateEmailForm
} from "./constants";
import { useAuth } from "../../config/auth";

const FieldContainer = styled.div`
  margin: 15px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

interface Props {
  formType: AuthFormType;
}

const LoginForm = () => {
  const { login } = useAuth();
  return (
    <Layout>
      <h1>{loginForm.title}</h1>
      <Formik
        initialValues={loginForm.fields}
        validationSchema={loginForm.validate}
        onSubmit={(values, { setSubmitting }) => {
          login(values)
            .then(() => {
              setSubmitting(false);
              const router = useRouter();
              router.push("/");
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}>
        {({ isSubmitting }) => (
          <Form>
            <FieldContainer>
              <label>EMAIL</label>
              <Field type="email" name="username" />
              <ErrorMessage name="username" component="div" />
            </FieldContainer>
            <FieldContainer>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </FieldContainer>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <p>
              Need an account?{" "}
              <Link href="/authenticate/signup">
                <a>Register</a>
              </Link>{" "}
              here
            </p>
            <p>
              <span>- Or -</span>
            </p>
            <p>Forgot your password?</p>
            <p>
              <Link href="/authenticate/forgot_password">
                <a>Reset</a>
              </Link>{" "}
              it here
            </p>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

const SignupForm = () => {
  const { register } = useAuth();
  return (
    <Layout>
      <h1>{signupForm.title}</h1>
      <Formik
        initialValues={signupForm.fields}
        validationSchema={signupForm.validate}
        onSubmit={(values, { setSubmitting }) => {
          register({ user: values })
            .then(() => {
              setSubmitting(false);
              const router = useRouter();
              router.push("/");
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}>
        {({ isSubmitting }) => (
          <Form>
            <FieldContainer>
              <label>EMAIL</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </FieldContainer>

            <FieldContainer>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </FieldContainer>

            <FieldContainer>
              <label>Confirm Password</label>
              <Field type="password" name="password_confirmation" />
              <ErrorMessage name="password_confirmation" component="div" />
            </FieldContainer>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <p>
              Already have an account{" "}
              <Link href="/authenticate/login">
                <a>Log In</a>
              </Link>{" "}
              here
            </p>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

const ForgotPasswordForm = () => {
  return (
    <Layout>
      <h1>{forgotPasswordForm.title}</h1>
      <Formik
        initialValues={forgotPasswordForm.fields}
        validationSchema={forgotPasswordForm.validate}
        onSubmit={(values, { setSubmitting }) => {
          forgotPasswordForm
            .onSubmit(values)
            .then(() => {
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}>
        {({ isSubmitting }) => (
          <Form>
            <FieldContainer>
              <label>EMAIL</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </FieldContainer>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <p>
              Login{" "}
              <Link href="/authenticate/login">
                <a>Login</a>
              </Link>{" "}
              here
            </p>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export const AuthForm = ({ formType }: Props) => {
  switch (formType) {
    case AuthFormType.login:
      return <LoginForm />;
    case AuthFormType.signup:
      return <SignupForm />;
    case AuthFormType.forgot_password:
      return <ForgotPasswordForm />;
    default:
      return null;
  }
};
