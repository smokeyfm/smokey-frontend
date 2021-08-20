import React, {
  useState,
  useEffect,
  // createRef,
  useRef,
  useCallback,
  KeyboardEvent,
  MouseEvent,
  TouchEvent
} from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { IconSearch, IconClose } from '@components/SVGs';
import { useProducts } from "../../hooks/useProducts";
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
} from "./SearchBar.styles";
import AutoComplete from "../AutoComplete";
import { useRouter } from "next/router";
import { useOnClickOutside } from "../../hooks";
import { SearchBarProps } from "./types";
import * as tracking from "../../config/tracking";

const SearchBar = ({
  placeholder = "Search...",
  autoComplete = true,
  value = "",
  ...rest
}: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(value);
  // const [searchResults, setSearchResults] = useState([]);
  const [isAutoCompleteVisible, setIsAutocompleteVisible] = useState(false);
  // const anyRef = createRef();

  const handleSearchChange = (e: any) => {
    const { value } = e.target;
    if (value.length === 0) handleSearchClear();
    setQuery(value);

    setIsAutocompleteVisible(true);
  };

  const handleSearchClear = () => {
    setQuery("");
    setIsAutocompleteVisible(false);
  };

  // const dropdownRef = createRef();

  const handleClickOutside = useCallback((event: Event) => {
    const someNode = event.target as Node;
    if (dropdownRef.current && dropdownRef.current.contains(someNode) !== null) {
      setIsAutocompleteVisible(false);
    }
  }, []);

  // useOnClickOutside(anyRef, handleClickOutside);
  const { ref: dropdownRef } = useCustomRef<HTMLDivElement>();

  const readinessIcon = () => {
    const { data, isLoading, isSuccess } = useProducts(1);
    if (isLoading) return <>...</>;

    if (!isSuccess) {
      return <>?</>;
    }

    return <>✅</>;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const keyboardEvents = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
      case "Tab":
        setIsAutocompleteVisible(false);
        break;
      case "Enter":
        if (query.length > 3) {
          if (event.key === "Enter" && query.length > 3) {
            tracking.trackEvent({
              action: tracking.Action.PRESS_ENTER,
              category: tracking.Category.SEARCH_BAR,
              label: query
            });

            router.push(`/search?term=${query}`);
          }
        }
        break;

      default:
        break;
    }
  };

  const selectSuggestion = (suggestion: string) => {
    tracking.trackEvent({
      action: tracking.Action.SELECT_SUGGESTION,
      category: tracking.Category.SEARCH_BAR,
      label: suggestion
    });

    setQuery(suggestion);
  };

  const labelId = "label-search";
  const dropdownId = "dropdown-search";

  return (
    <StyledSearch
      role="combobox"
      aria-haspopup="listbox"
      aria-owns="search"
      aria-expanded={isAutoCompleteVisible}
      ref={dropdownRef}
      aria-labelledby={labelId}
      {...rest}>
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
              onKeyDown={(e: KeyboardEvent) => keyboardEvents(e)}
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
        </SearchInputWrapper>
        <ButtonWrapper>
          <BrowseButton>Search</BrowseButton>
        </ButtonWrapper>
      </SearchBarWrapper>

      {autoComplete ? (
        <AutoComplete
          isVisible={isAutoCompleteVisible}
          toggleVisibility={(e: any) => setIsAutocompleteVisible(e)}
          id={dropdownId}
          labelId={labelId}
          onSelect={(e: any) => selectSuggestion(e)}
          query={query}
        />
      ) : null}
    </StyledSearch>
  );
};

const useCustomRef = <T extends HTMLElement>() => {
  const myRef = useRef<T>(null);

  return { ref: myRef };
};

export default SearchBar;
