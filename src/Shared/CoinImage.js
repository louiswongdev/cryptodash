import React from 'react';
import styled, {css} from 'styled-components';

const CoinImageStyled = styled.img`
  padding: 10px 0;
  height: 50px;
  border-radius: 50%;
  display: block;
  margin: auto;

  ${props => props.spotlight && css`
    height: 200px;
    
  `}
`;

const CoinImage = ({ coin, spotlight }) => {
  return (
    <CoinImageStyled 
      spotlight={spotlight}
      alt={coin.CoinSymbol}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />
  );
};

export default CoinImage;
