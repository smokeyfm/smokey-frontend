// Vendor
import React, { useState, useCallback } from "react";
// import NumberFormat from 'react-number-format';
import { Field, useFormikContext } from "formik";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// Local
import Sebastian from "../Sebastian";
import { FormikInput, FormikAutocomplete } from "../FormikWrappers";
import { QuestionWrapper, InputGroupWrapper, InputWrapper } from "./Questions.styles";

// const suggestions = [
//   '100 Freeman Street Brooklyn NY 11222',
//   '100 Freeman Road Birmingham KY 19278'
// ];

function Question3() {
  // const [homeAddress, setHomeAddress] = useState('');

  // const { errors, touched } = useFormikContext();

  const speechMarkup = useCallback(() => {
    return { __html: "Where do you currently live?" };
  });

  return (
    <QuestionWrapper>
      <Sebastian speech={speechMarkup()} />
      <InputGroupWrapper>
        <InputWrapper>
          <Field
            name="homeAddress"
            id="homeAddress"
            component={FormikAutocomplete}
            label="Home Address"
          />
        </InputWrapper>
        <InputWrapper>
          <span>Live in an apartment?</span>
          <Field name="unitNumber" id="unitNumber" component={FormikInput} label="Apt / Unit" />
        </InputWrapper>
      </InputGroupWrapper>
    </QuestionWrapper>
  );
}

export default Question3;
