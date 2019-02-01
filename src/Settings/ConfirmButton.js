import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { fontSize1, greenBoxShadow, color3 } from '../Shared/Styles';

const ConfirmButtonStyled = styled.div`
  margin-top: 20px;
  color: #36d7b7;
  font-size: 1rem;
  padding: 8px 12px;
  cursor: pointer;
  background: transparent;
  border: 1.5px solid #36d7b7;
  color: #36d7b7;
  transition: all 0.2s;
  
  &:hover {
    background: #36d7b7;
    color: #fff;
    border: 1.5px solid #36d7b7;
  }
  `;

export const AlignRightDiv = styled.div`
  display: grid;
  justify-content: flex-end;  
`;

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

const ConfirmButton = () => {
  return (
    <AppContext.Consumer>
      {({ confirmFavorites }) => (
        // <CenterDiv>
          <AlignRightDiv>
            <ConfirmButtonStyled onClick={confirmFavorites}>
              Confirm Favorites
            </ConfirmButtonStyled>
          </AlignRightDiv>
        // </CenterDiv>
      )}
    </AppContext.Consumer>
  );
};

export default ConfirmButton;
