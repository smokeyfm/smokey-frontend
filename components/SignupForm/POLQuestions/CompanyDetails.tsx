// Vendor
import React, { useCallback } from "react";
import { Field } from "formik";
import { Button } from "@material-ui/core";

// Local
import TipBot from "../../TipBot";
import { FormikInput } from "../../FormikWrappers";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { QuestionWrapper, InputGroupWrapper, InputWrapper } from "./Questions.styles";
=======
=======
>>>>>>> 8392170 (update prettierrc, fix up colors everywhere to use theme vars, fix up ComingSoon)
import {
  QuestionWrapper,
  InputGroupWrapper,
  InputWrapper
} from "./Questions.styles";
<<<<<<< HEAD
>>>>>>> 9a38330 (tons of Product details upgrades, tons of stuff, terms & conditions, footer, hooks)
=======
import { QuestionWrapper, InputGroupWrapper, InputWrapper } from "./Questions.styles";
>>>>>>> 50eb7ac (tons of Product details upgrades, tons of stuff, terms & conditions, footer, hooks)
=======
>>>>>>> 8392170 (update prettierrc, fix up colors everywhere to use theme vars, fix up ComingSoon)
=======
import { QuestionWrapper, InputGroupWrapper, InputWrapper } from "./Questions.styles";
>>>>>>> cd817ba (tons of Product details upgrades, tons of stuff, terms & conditions, footer, hooks)

export const CompanyDetails = () => {
  // const { errors, touched } = useFormikContext()

  const speechMarkup = useCallback(() => {
    return { __html: "Can you tell a bit about your company?" };
  }, []);

  return (
    <QuestionWrapper>
      <TipBot speech={speechMarkup()} />
      <InputGroupWrapper>
        <InputWrapper>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 50eb7ac (tons of Product details upgrades, tons of stuff, terms & conditions, footer, hooks)
          <Field
            name="companyName"
            id="companyName"
            component={FormikInput}
            label="Company Name"
            required
          />
<<<<<<< HEAD
        </InputWrapper>
        <InputWrapper>
          <Field
            name="permitNumber"
            id="permitNumber"
            component={FormikInput}
            label="Reseller's Permit Number"
            required
          />
=======
          <Field name="companyName" id="companyName" component={FormikInput} label="Company Name" required />
        </InputWrapper>
        <InputWrapper>
          <Field name="permitNumber" id="permitNumber" component={FormikInput} label="Reseller's Permit Number" required />
>>>>>>> 9a38330 (tons of Product details upgrades, tons of stuff, terms & conditions, footer, hooks)
=======
        </InputWrapper>
        <InputWrapper>
          <Field
            name="permitNumber"
            id="permitNumber"
            component={FormikInput}
            label="Reseller's Permit Number"
            required
          />
>>>>>>> 50eb7ac (tons of Product details upgrades, tons of stuff, terms & conditions, footer, hooks)
        </InputWrapper>
      </InputGroupWrapper>
    </QuestionWrapper>
  );
};
