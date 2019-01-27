import React from 'react'
import { AppContext } from '../App/AppProvider';
import { GridLoader } from 'react-spinners';
import { css } from 'styled-components';

const override = css`
    display: block !important;
    margin: 0 auto;
    /* margin-top: 10rem; */ 
    border-color: red;
`;

const Content = ({children}) => {
  return (
    <AppContext.Consumer>
      {({loading}) => {
        if(loading) {
          return (
            <GridLoader
              css={override}
              sizeUnit={"px"}
              size={18}
              color={'#36D7B7'}
            />
          )
        }

        return <div>{children}</div>
      }}
    </AppContext.Consumer>
  )
}

export default Content
