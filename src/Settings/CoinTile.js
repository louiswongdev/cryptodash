import React from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DeletableTile, DisabledTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

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

const CoinTile = ({ coinKey, topSection }) => {
  return (
    <AppContext.Consumer>
      {({
        coinList,
        addCoin,
        removeCoin,
        isInFavorites
      }) => {
        let coin = coinList[coinKey];
        let TileClass;

        // For Top/Favorites section, we want styles from Deleteable
        // ...else SelectableTile
        topSection ? (TileClass = DeletableTile) : (TileClass = SelectableTile);

        // Check if coin is in Favorites. If so, use DisabledTile
        if (!topSection && isInFavorites(coinKey)) {
          TileClass = DisabledTile;
        }

        return (
          <>
            <TileClass
              onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
            >
              <CoinHeaderGrid
                topSection={topSection}
                name={coin.CoinName}
                symbol={coin.Symbol}
              />
              <CoinImage coin={coin} />
            </TileClass>
          </>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinTile;
