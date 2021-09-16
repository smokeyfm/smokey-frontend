import React from "react";
import { TextField } from "@material-ui/core";
// import { Field, useFormikContext } from 'formik';

import { Error } from "./FormikInput.styles";

const FormikInput: React.FC<any> = ({
  field: { ...fields },
  form: { touched, errors },
  styles,
  ...props
}) => (
  <>
    <TextField
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
