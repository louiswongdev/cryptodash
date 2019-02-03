import React from 'react';
import { AppContext } from '../App/AppProvider';
import styled from 'styled-components';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 15px;
  margin-top: 8px;
`;

const getLowerSectionCoins = (coinList, filteredCoins) => {
  return (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 54);
}

// If has topSection prop, show favorite coins from state,
// else, all 100 for bottom grid tiles
const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => {
  return topSection
    ? favorites
    : getLowerSectionCoins(coinList, filteredCoins);
};

const CoinGrid = ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(
            (coinKey, i) => (
              <CoinTile topSection={topSection} coinKey={coinKey} key={i} />
            )
          )}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
