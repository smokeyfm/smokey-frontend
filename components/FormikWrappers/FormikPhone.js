import React from "react";
import Input from "@carvana/showroom-forms/Input";
// import { Field, useFormikContext } from 'formik';

import { Error } from "./FormikInput.styles";

const FormikPhone = ({ field: { ...fields }, form: { touched, errors }, styles, ...props }) => (
  <>
    {/* <Input id="phoneNumber" variant="phoneNumber" selectedTheme="dark" {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])}/> */}
    <Input
      id="phoneNumber"
      variant="phoneNumber"
      selectedTheme="dark"
      {...props}
      {...fields}
      invalid={touched[fields.name] && errors[fields.name] ? 1 : 0}
    />
    {touched[fields.name] && errors[fields.name] ? <Error>{errors[fields.name]}</Error> : ""}
  </>
);
export default FormikPhone;
