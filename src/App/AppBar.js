import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';
import ThemeToggle from '../Shared/ThemeToggle';

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 180px 50px;
  margin-bottom: 40px;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
`;

const MenuItems = styled.div`
display: grid;
  /* justify-self: right; */
`;

const ControlButtonEl = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      /* text-shadow: 2px 2px 12px #36D7B7; */
      /* border-bottom: 2px solid #36D7B7; */
      color: #36d7b7;
    `}
  ${props =>
    props.hidden &&
    css`
      diplay: none;
    `}
`;

function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

const ControlButton = ({ name }) => {
  return (
    <AppContext.Consumer>
      {({ page, setPage, firstVisit }) => (
        <ControlButtonEl
          active={page === name}
          onClick={() => setPage(name)}
          hidden={firstVisit && name === 'dashboard'}
        >
          {toProperCase(name)}
        </ControlButtonEl>
      )}
    </AppContext.Consumer>
  );
};

const AppBar = () => {
  return (
    <Bar>
      <Logo>CyptoDash</Logo>
      {/* <MenuItems> */}
        <div />
        <ControlButton active name="dashboard" />
        <ControlButton name="settings" />
        <ThemeToggle />
      {/* </MenuItems> */}
    </Bar>
  );
};

export default AppBar;
