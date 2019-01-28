import React from 'react';

const CoinImage = ({ coin, style }) => {
  return (
    <img
      alt={coin.CoinSymbol}
      style={style || { height: '50px', marginTop: '10px', borderRadius: '50%' }}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />
  );
};

export default CoinImage;
