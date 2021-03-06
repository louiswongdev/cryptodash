import React from 'react';
import { AppContext } from '../App/AppProvider';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../Shared/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePct = styled.div`
  color: green;
  ${props => props.red && css `
    color: red;
  `}
`;

const numberFormat = number => {
  return +(number + '').slice(0, 7);
}

const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    ${fontSize3}
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    justify-items: right;
  `} 

  ${props => props.currentFavorite && css `
    pointer-events: none;
    ${greenBoxShadow}
  `}

  ${props => props.checked && css `
    background: white;
  `}
`;

const ChangePercent = ({data}) => {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}%  
      </ChangePct>
    </JustifyRight>
  )
}

const PriceTileDashboard = ({sym, data, currentFavorite, setCurrentFavorite, checked}) => {
  return (
    <PriceTileStyled onClick={setCurrentFavorite} currentFavorite={currentFavorite} checked={checked}>
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>
        ${numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  )
}

const PriceTileCompact = ({sym, data, currentFavorite, setCurrentFavorite, checked}) => {
  return (
    <PriceTileStyled onClick={setCurrentFavorite} compact currentFavorite={currentFavorite} checked={checked}>
      <JustifyLeft>{sym}</JustifyLeft>
      <ChangePercent data={data} />
      <div>
        ${numberFormat(data.PRICE)}
      </div>
    </PriceTileStyled>
  )
}

const PriceTile = ({ price, index }) => {
  let sym = Object.keys(price)[0];
  let data = price[sym]['USD'];
  let TileClass = index < 5 ? PriceTileDashboard : PriceTileCompact;
  return (
    <AppContext.Consumer>
      {({currentFavorite, setCurrentFavorite, checked}) => (
        <TileClass 
          sym={sym} 
          data={data} 
          currentFavorite={currentFavorite === sym}
          setCurrentFavorite={() => setCurrentFavorite(sym)}
          checked={checked}
        />
      )}
    </AppContext.Consumer>
  );
};

export default PriceTile;
