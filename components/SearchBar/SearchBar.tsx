import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { IconSearch, IconClose } from '@components/SVGs';
import { operations } from '../../ducks';
import {
  StyledSearch,
  StyledInputContainer,
  SearchInputWrapper,
  StyledInput,
  StyledIcon,
  StyledInputPrefix,
  StyledInputPostfix,
  SearchButton,
  BrowseButton,
  SearchBarWrapper,
  ButtonWrapper
} from './SearchBar.styles';
import AutoComplete from '../AutoComplete';
import { Router } from 'next/router';

import {
  SearchBarProps
} from './types'

const SearchBar = ({
  placeholder = 'Search...',
  autoComplete = true,
  value = '',
  ...rest
}: SearchBarProps) => {
  const [query, setQuery] = useState(value);
  const [searchResults, setSearchResults] = useState<Any[]>([]);
  const [isAutoCompleteVisible, setIsAutocompleteVisible] = useState(false);

  const handleSearchChange = e => {
    const { value } = e.target;
    if (value.length === 0) handleSearchClear();
    setQuery(value);

    setIsAutocompleteVisible(true);
  };

  const handleSearchClear = () => {
    setQuery('');
    setIsAutocompleteVisible(false);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsAutocompleteVisible(false);
    }
  };

  // const getProductData = async (params) => {
  //   const { page } = params.queryKey;
  //   // const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  //   // fetch(`${process.env.CAREERS_WP_API_URL}/pages?slug=landing`).then(res =>
  //   const response = await fetch(`${process.env.GREENHOUSE_BASE_URL}/jobs/?page=${page}`)
  //   if (!response.ok) {
  //     throw new Error("Problem fetching jobs");
  //   }
  //   const data = await response.json();
  //   // assertIsJobResponse(data);
  //   return data;
  // }

  const readinessIcon = () => {
    const { data, isLoading, isSuccess } = useProducts(1);
    if (isLoading) return <>...</>;

    if (!isSuccess) {
      return <>?</>;
    }

    return <>✅</>;
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const keyboardEvents = event => {
    const { key, target } = event;

    switch (key) {
      case 'Escape':
      case 'Tab':
        setIsAutocompleteVisible(false);
        break;
      case 'Enter':
        if (target?.value?.length > 3) {
          if (key === 'Enter' && target?.value?.length > 3) {
            Router.push(`/apply?`)
          }
        }
        break;

      default:
        break;
    }
  };

  const labelId = 'label-search';
  const dropdownId = 'dropdown-search';

  return (
    <StyledSearch
      role="combobox"
      aria-haspopup="listbox"
      aria-owns="search"
      aria-expanded={isAutoCompleteVisible}
      ref={dropdownRef}
      aria-labelledby={labelId}
      {...rest}
    >
      <SearchBarWrapper className="is-search-route">
        <SearchInputWrapper>
          <StyledInputContainer>
            <StyledInputPrefix>
              <StyledIcon>
                {/* <IconSearch /> */}
                <>0: </>
              </StyledIcon>
            </StyledInputPrefix>
            <StyledInput
              onKeyDown={keyboardEvents}
              tabIndex={0}
              value={query}
              placeholder={placeholder}
              onChange={handleSearchChange}
              id="search"
              aria-controls={dropdownId}
              aria-labelledby={labelId}
              role="textbox"
              autoComplete="off"
            />

            {readinessIcon}
            {query && (
              <StyledInputPostfix onClick={handleSearchClear}>
                <StyledIcon className="close-icon">
                  {/* <IconClose /> */}
                  <>X</>
                </StyledIcon>
              </StyledInputPostfix>
            )}
          </StyledInputContainer>
          <SearchButton>Go</SearchButton>
        </SearchInputWrapper>
        <ButtonWrapper>
          <BrowseButton small>Search</BrowseButton>
        </ButtonWrapper>
      </SearchBarWrapper>

      {autoComplete ? (
        <AutoComplete
          isVisible={isAutoCompleteVisible}
          toggleVisibility={e => setIsAutocompleteVisible(e)}
          id={dropdownId}
          labelId={labelId}
          onSelect={e => setQuery(e)}
          query={query}
        />
      ) : (
        <>
          {/* <ArticleResults searchQuery={query} /> */}
          <div>{query}</div>
          <div>Loading: {isLoading}</div>
        </>
      )}
    </StyledSearch>
  );
};

export default SearchBar;