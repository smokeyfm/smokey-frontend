import React from 'react';
import Router from 'next/router';
import { nanoid } from 'nanoid';
// import { useDispatch } from 'react-redux';
// import { commonOperations } from '@common/ducks';
import {
  StyledSuggestionLink,
  StyledSuggestionContent
} from './AutoComplete.styles';

const formatWithHighlight = (text, query) => {
  if (!query) return text;

  const sanitizeString = str => {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '');
    return str.trim();
  };

  const reg = new RegExp(`(${sanitizeString(query)})`, 'gi');
  const textParts = text.split(reg);

  return textParts.map(part =>
    part.match(reg) ? (
      part
    ) : (
      <span key={nanoid()} style={{ fontWeight: 'normal' }}>
        {part}
      </span>
    )
  );
};

// type OwnProps = {
//   suggestion?: {
//     id?: string;
//     article_id?: string;
//     article_name: string;
//   };
//   query?: string;
// };

// const Suggestion = ({ suggestion, query }: OwnProps) => {
const Suggestion = ({ suggestion, query, onChange, toggleVisibility }) => {

  const handleSelection = () => {
    onChange('')
    toggleVisibility()
    Router.push(`/${suggestion.attributes.slug}?id=${suggestion.id}`)
  }

  // const dispatch = useDispatch();
  if (suggestion) {
    return (
      <StyledSuggestionLink onClick={() => handleSelection()}>
        <StyledSuggestionContent>
          {formatWithHighlight(suggestion.attributes.name, query)}
        </StyledSuggestionContent>
      </StyledSuggestionLink>
    );
  } else {
    return;
  }
};

export default Suggestion;
