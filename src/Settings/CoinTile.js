import React from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DeletableTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

const CoinTile = ({ coinKey, topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        let coin = coinList[coinKey];
        let TileClass;

        // For Top/Favorites section, we want styles from Deleteable
        // ...else SelectableTile
        topSection ? (TileClass = DeletableTile) : (TileClass = SelectableTile);

        return (
          <TileClass>
            <CoinHeaderGrid
              topSection={topSection}
              name={coin.CoinName}
              symbol={coin.Symbol}
            />
            <CoinImage coin={coin} />
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinTile;
