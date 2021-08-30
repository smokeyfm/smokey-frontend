import React from "react";
import Input from "@carvana/showroom-forms/Input";
// import { Field, useFormikContext } from 'formik';

import { Error } from "./FormikInput.styles";

const FormikInput = ({ field: { ...fields }, form: { touched, errors }, styles, ...props }) => (
  <>
    <Input
      id="email"
      variant="email"
      {...props}
      {...fields}
      invalid={Boolean(touched[fields.name] && errors[fields.name])}
    />
    {touched[fields.name] && errors[fields.name] ? <Error>{errors[fields.name]}</Error> : ""}
  </>
);
export default FormikInput;
