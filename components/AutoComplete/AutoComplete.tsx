import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useProducts } from "../../hooks/useProducts";
import { StyledAutoComplete } from "./AutoComplete.styles";
import Suggestion from "./Suggestion";
import { AutoCompleteProps } from "./types";

const AutoComplete = ({
  id,
  labelId,
  isVisible,
  toggleVisibility,
  onSelect,
  query
}: AutoCompleteProps) => {
  const { error, status, data, isLoading, isSuccess } = useProducts(1);
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState<Any[]>([]);
  // const [error, setError] = useState('');

  useEffect(() => {
    // getSearchData();
    data ? console.log("stuff: ", data) : null;
    console.log("suggestions: ", suggestions, "data: ", data);
  }, []);

  if (isLoading) {
    return (
      <StyledAutoComplete role="listbox" aria-labelledby={labelId} id={id}>
        <h1>Loading {status}</h1>
      </StyledAutoComplete>
    );
  }

  if (error) {
    return (
      <StyledAutoComplete role="listbox" aria-labelledby={labelId} id={id}>
        <h1>Error {status}</h1>
      </StyledAutoComplete>
    );
  }

  return (
    <StyledAutoComplete role="listbox" aria-labelledby={labelId} id={id}>
      {isVisible &&
        data?.data?.map((job, index) => {
          {
            /* console.log(job); */
          }
          return (
            <Suggestion
              suggestion={job}
              key={`${job.internal_job_id}-${index}`}
              toggleVisibility={(e) => toggleVisibility(e)}
              onChange={(e) => onSelect(e)}
              query={query}
            />
          );
        })}
    </StyledAutoComplete>
  );
};

export default AutoComplete;
