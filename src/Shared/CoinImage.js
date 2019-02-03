import React from 'react';
import styled from 'styled-components';

const CoinImageStyled = styled.div`
  display: grid;
  justify-content: center;
  padding-bottom: 10px;
`;

const CoinImage = ({ coin, style }) => {
  return (
    <CoinImageStyled>
      <img
        alt={coin.CoinSymbol}
        style={style || { height: '50px', marginTop: '10px', borderRadius: '50%' }}
        src={`http://cryptocompare.com/${coin.ImageUrl}`}
      />
    </CoinImageStyled>
  );
};

export default CoinImage;
