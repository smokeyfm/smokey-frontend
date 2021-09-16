import React from "react";
import { TextField } from "@material-ui/core";

import { Error } from "./FormikInput.styles";

const FormikDateOfBirth: React.FC<any> = ({
  field: { ...fields },
  form: { touched, errors },
  ...props
}) => (
  <>
    <TextField
      id="dateOfBirth"
      variant="outlined"
      selectedTheme="dark"
      {...props}
      {...fields}
      invalid={Boolean(touched[fields.name] && errors[fields.name]).toString()}
    />
    {touched[fields.name] && errors[fields.name] ? <Error>{errors[fields.name]}</Error> : ""}
  </>
);
export default FormikDateOfBirth;
