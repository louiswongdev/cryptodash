import React from 'react';
import { AppContext } from '../App/AppProvider';
import styled, { css } from 'styled-components';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
`;

const CoinGrid = () => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <CoinGridStyled>
          {Object.keys(coinList).map(coinKey => (
            <div> {coinKey} </div>
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
