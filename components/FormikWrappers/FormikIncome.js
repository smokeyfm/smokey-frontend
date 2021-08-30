import React from "react";
import Input from "@carvana/showroom-forms/Input";

import { Error } from "./FormikInput.styles";

const FormikIncome = ({
  field,
  field: { ...fields },
  form: { touched, errors, name },
  ...props
}) => (
  <>
    {/* <Input id="income" variant="income" input="number" selectedTheme="dark" {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])} /> */}
    <Input
      id="income"
      variant="income"
      input="number"
      selectedTheme="dark"
      {...props}
      {...fields}
      invalid={touched[fields.name] && errors[fields.name] ? 1 : 0}
    />
    {touched[fields.name] && errors[fields.name] ? <Error>{errors[fields.name]}</Error> : ""}
  </>
);
export default FormikIncome;
