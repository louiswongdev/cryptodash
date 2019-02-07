import React from 'react';
import styled from 'styled-components';
import { DeletableTile } from '../Shared/Tile';

export const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CoinName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
  color: #d1d1d1;
  font-size: 0.8rem;
`;

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeletableTile}:hover & {
    display: block;
    color: red;
    font-size: 0.8rem;
  }
`;

const CoinHeaderGrid = ({ name, symbol, topSection }) => {
  return (
    <CoinHeaderGridStyled>
      <CoinName>{name}</CoinName>
      {topSection ? (
        <DeleteIcon> Remove </DeleteIcon>
      ) : (
        <CoinSymbol> {symbol} </CoinSymbol>
      )}
    </CoinHeaderGridStyled>
  );
};

export default CoinHeaderGrid;
