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

  ${({disabled}) => disabled && `
    opacity: .4;
    pointer-events: none;   
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
    console.log('clicked')
    removeCoin(coinKey);
  }
  : () => {
    addCoin(coinKey);
  };
};

const DeletableTileThemed = ({checked, topSection, name, symbol, coin, onClick}) => {
  return (
    <DeletableTileStyled onClick={onClick} checked={checked}>
      {coin ? (
        <>
          <CoinHeaderGrid
          topSection={topSection}
          name={coin.CoinName}
          symbol={coin.Symbol}
          />
          <CoinImage coin={coin} />
        </>
      ): null}
    </DeletableTileStyled>
  )
}

const SelectableTileThemed = ({checked, topSection, coin, onClick, disabled}) => {
  return (
    <SelectableTileStyled disabled={disabled} onClick={onClick} checked={checked} >
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
  console.log(coinKey)
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
        let disabled = false;

        // For Top/Favorites section, we want styles from Deleteable
        // ...else SelectableTile
        topSection ? (TileClass = DeletableTileThemed) : (TileClass = SelectableTileThemed);

        // Check if coin is in Favorites. If so, use DisabledTile
        if (!topSection && isInFavorites(coinKey)) {
          disabled = true;
        }

        return (
          <>
            <TileClass
              onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
              checked={checked}
              topSection={topSection}
              coin={coin}
              disabled={disabled}
            >
            </TileClass>
          </>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinTile;
