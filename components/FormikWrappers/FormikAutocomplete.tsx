import React, { useState, useEffect } from "react";
// import { setFieldValue } from 'formik';
import { useField } from 'formik';

import { TextField } from "@material-ui/core";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import {
  Error,
  HiddenInput,
  SuggestionWrapper,
  SuggestionLoader,
  SuggestionItem
} from "./FormikInput.styles";

// interface FormikAutocompleteType {
//   name: string;
//   type: string;
//   placeholder: string;
//   props: any;
// }

// Reference: https://github.com/mui-org/material-ui/issues/18331#issuecomment-569981389
// const FormikAutocomplete: React.FC<FormikAutocompleteType> = ({
//   field,
//   fields: { ...fields },
//   form: { setFieldValue, touched, errors },
//   form,
//   ...props
// }) => {
const FormikAutocomplete: React.FC<any> = (props) => {
  const [
    field,
    { error, touched },
  ] = useField({
    name: props.name,
    type: props.name,
  });

  const { form: { setFieldValue } } = props;
  const [homeAddress, setHomeAddress] = useState("");
  const [addressSelected, setAddressSelected] = useState(false);

  // const { setTouched, setFieldValue, name } = props;

  const handleChange = (input: any) => {
    // console.log('changing');
    setAddressSelected(false);
    setHomeAddress(input);
    // setFieldValue(name, search, false);
  };

  const handleSelect = (address: any) => {
    // geocodeByAddress(address)
    //   .then(results => getLatLng(results[0]))
    //   .then(latLng => console.log('Success', latLng))
    //   .catch(error => console.error('Error', error));
    setAddressSelected(true);
    setHomeAddress(address.address);
    setFieldValue(address.name, address.address, false);
  };

  return (
    <>
      <PlacesAutocomplete
        value={homeAddress || field.value}
        onChange={handleChange}
        onSelect={(address) => handleSelect({ name: field.name, address })}>
        {({ suggestions, getInputProps, getSuggestionItemProps, loading }) => (
          <>
            <TextField
              {...getInputProps({
                label: "Home Address",
                className: "location-search-input"
              })}
              type="text"
              variant="outlined"
              // selectedTheme="dark"
              // invalid={Boolean(touched[fields.name] && errors[fields.name])}
            />
            {!addressSelected && homeAddress !== "" && (
              <SuggestionWrapper>
                {loading && <SuggestionLoader>Loading...</SuggestionLoader>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item active"
                    : "suggestion-item";
                  return (
                    <SuggestionItem
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}>
                      <span>{suggestion.description}</span>
                    </SuggestionItem>
                  );
                })}
              </SuggestionWrapper>
            )}
          </>
        )}
      </PlacesAutocomplete>
      {/* <HiddenInput>
            <Input id="dateOfBirth" {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name]).toString()}/>
          </HiddenInput> */}
      {/* <Autocomplete id="homeAddress"
            {...props}
            {...fields}
            invalid={Boolean(touched[fields.name] && errors[fields.name])}
            value={props.value}
            onChange={ event => setHomeAddress(name, event.target.value) }
            // onChange={ () => console.log('TYPE TYPE')}
            onBlur={ () => setTouched({ [name]: true }) }
          /> */}
      {/* {touched[field.name] && errors[field.name] ? <Error>{errors[field.name]}</Error> : ""} */}
    </>
  );
};
export default FormikAutocomplete;
