import React from 'react';
import { AppContext } from '../App/AppProvider';
import styled, { css } from 'styled-components';
import { SelectableTile, DeletableTile, DisabledTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';


const DeletableTileStyled = styled(DeletableTile)`
  ${props => props.checked && css `
    background: #fafafa;
  `}
`;

const SelectableTileStyled = styled(SelectableTile)`
  ${props => props.checked && css `
    background: #fafafa;
  `}
`;

const clickCoinHandler = (
  topSection,
  coinKey,
  addCoin,
  removeCoin
) => {

  return topSection
  ? () => {
    removeCoin(coinKey);
  }
  : () => {
    addCoin(coinKey);
  };
};

const DeletableTileThemed = ({checked, topSection, name, symbol, coin}) => {
  return (
    <DeletableTileStyled checked={checked}>
      <CoinHeaderGrid
        topSection={topSection}
        name={coin.CoinName}
        symbol={coin.Symbol}
        />
      <CoinImage coin={coin} />
    </DeletableTileStyled>
  )
}

const SelectableTileThemed = ({checked, topSection, coin}) => {
  return (
    <SelectableTileStyled checked={checked}>
      <CoinHeaderGrid
        topSection={topSection}
        name={coin.CoinName}
        symbol={coin.Symbol}
        />
      <CoinImage coin={coin} />
    </SelectableTileStyled>
  )
}

const CoinTile = ({ coinKey, topSection }) => {
  return (
    <AppContext.Consumer>
      {({
        coinList,
        addCoin,
        removeCoin,
        isInFavorites,
        checked
      }) => {
        let coin = coinList[coinKey];
        let TileClass;

        // For Top/Favorites section, we want styles from Deleteable
        // ...else SelectableTile
        topSection ? (TileClass = DeletableTileThemed) : (TileClass = SelectableTileThemed);

        // Check if coin is in Favorites. If so, use DisabledTile
        if (!topSection && isInFavorites(coinKey)) {
          TileClass = DisabledTile;
        }

        return (
          <>
            <TileClass
              onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
              checked={checked}
              topSection={topSection}
              coin={coin}
            >
            </TileClass>
          </>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinTile;
