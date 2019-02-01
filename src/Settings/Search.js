import React from 'react'
import styled from 'styled-components';
import { fontSize2 } from '../Shared/Styles';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #36d7b7;
  place-self: center left;
`;

const Search = () => {
  return (
    <SearchGrid>
      <h3>Search all coins</h3>
      <SearchInput />
    </SearchGrid>
  )
}

export default Search
