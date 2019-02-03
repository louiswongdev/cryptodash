import React from 'react'
import styled from 'styled-components';
import { fontSize2 } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #282828;
  place-self: center left;
`;

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
  // Get all the coin symbols
  let coinSymbols = Object.keys(coinList);
  // Get all the coin names, map symbol to name
  let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
  let allStringsToSearch = [...coinSymbols, ...coinNames];
  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string);

  
  let filteredCoins = _.pickBy(coinList, (value, symKey) => {
    let coinName = value.CoinName;
    return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
  })

  setFilteredCoins(filteredCoins);
}, 300);

const filterCoins = (e, setFilteredCoins, coinList) => {
  let inputValue = e.target.value;

  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
}

const Search = () => {
  return (
    <AppContext.Consumer>
      {({setFilteredCoins, coinList}) => (
        <SearchGrid>
          <h3>Search all coins</h3>
          <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)} />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  )
}

export default Search
