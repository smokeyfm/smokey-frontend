import React from "react";
import { Input } from "@material-ui/core";

import { Error } from "./FormikInput.styles";

const FormikDateOfBirth = ({ field: { ...fields }, form: { touched, errors }, ...props }) => (
  <>
    <Input
      id="dateOfBirth"
      variant="dateOfBirth"
      selectedTheme="dark"
      {...props}
      {...fields}
      invalid={Boolean(touched[fields.name] && errors[fields.name]).toString()}
    />
    {touched[fields.name] && errors[fields.name] ? <Error>{errors[fields.name]}</Error> : ""}
  </>
);
export default FormikDateOfBirth;
