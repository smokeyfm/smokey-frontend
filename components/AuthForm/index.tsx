import * as React from "react";
import Link from "next/link";
import { Layout } from "../../components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "@emotion/styled";
import { AuthFromType, formConfig } from "./constants";

const FieldContainer = styled.div`
  margin: 15px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

interface Props {
  formType: AuthFromType;
}
export const AuthForm = ({ formType }: Props) => {
  if (!formType) {
    return null;
  }
  const formFields = { ...formConfig[formType].fields };
  return (
    <Layout>
      <h1>{formConfig[formType].title}</h1>
      <Formik
        initialValues={formFields}
        validationSchema={formConfig[formType].validate}
        onSubmit={(values, { setSubmitting }) => {
          formConfig[formType]
            .onSubmit(values)
            .then(() => {
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {formFields.hasOwnProperty("email") && (
              <FieldContainer>
                <label>EMAIL</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </FieldContainer>
            )}
            {formFields.hasOwnProperty("password") && (
              <FieldContainer>
                <label>Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </FieldContainer>
            )}
            {formFields.hasOwnProperty("password_confirmation") && (
              <FieldContainer>
                <label>Confirm Password</label>
                <Field type="password" name="password_confirmation" />
                <ErrorMessage name="password_confirmation" component="div" />
              </FieldContainer>
            )}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            {formType === AuthFromType.login && (
              <p>
                Need an account?{" "}
                <Link href="/authenticate/signup">
                  <a>Register</a>
                </Link>{" "}
                here
              </p>
            )}
            {formType === AuthFromType.signup && (
              <p>
                Already have an account{" "}
                <Link href="/authenticate/login">
                  <a>Log In</a>
                </Link>{" "}
                here
              </p>
            )}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
