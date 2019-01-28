import React from 'react';
import { AppContext } from '../App/AppProvider';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../Shared/Tile';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

// Return only the first 100 coins
const getCoinsToDisplay = coinList => {
  return Object.keys(coinList).slice(0, 100);
};

const CoinGrid = () => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList).map((coinKey,i) => (
            <CoinTile coinKey={coinKey} key={i} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
