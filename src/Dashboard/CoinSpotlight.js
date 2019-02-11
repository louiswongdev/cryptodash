import React from 'react'
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';
import styled, {css} from 'styled-components';

const SpotlightName = styled.h2`
  text-align: center;
`;

const StyledSpotlightTile = styled(Tile)`
  ${props => props.checked && css `
    background: white;
  `}
  
`;

const CoinSpotlight = () => {
  return (
    <AppContext.Consumer>
      {({currentFavorite, coinList, checked}) => (
        <StyledSpotlightTile checked={checked}>
          <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
          <CoinImage spotlight coin={coinList[currentFavorite]} />
        </StyledSpotlightTile>
  )}
    </AppContext.Consumer>
  )
}

export default CoinSpotlight;