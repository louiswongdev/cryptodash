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

// If has topSection prop, show favorite coins from state,
// else, all 100 for bottom grid tiles
const getCoinsToDisplay = (coinList, topSection, favorites) => {
  return topSection
    ? favorites
    : Object.keys(coinList).slice(0, topSection ? 10 : 54);
};

const CoinGrid = ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favorites).map(
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
