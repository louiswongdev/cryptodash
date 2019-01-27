import React from 'react';
import styled, {css} from 'styled-components';

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 180px;
`;

const AppBar = () => {
  return (
    <Bar>
      <div>CyptoDash</div>
      <div/>
      <div>Dashboard</div>
      <div>Settings</div>
    </Bar>
  )
}

export default AppBar;