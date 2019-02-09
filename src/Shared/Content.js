import React from 'react'
import { AppContext } from '../App/AppProvider';
import { GridLoader } from 'react-spinners';
import styled from 'styled-components';
import { CenterDiv } from '../Settings/ConfirmButton';

const CenteredSpinner = styled(CenterDiv)`
  margin-top: 180px;
  display: grid;
  justify-content: center;
`;

// const override = css`
//     display: block !important;
//     margin: 0 auto;
//     /* margin-top: 10rem; */ 
//     /* border-color: red; */
// `;

const Content = ({children}) => {
  return (
    <AppContext.Consumer>
      {({coinList, prices, loading, firstVisit}) => {
        // make sure that coinList and prices are set in state 
        // before we show dashboard area
        if(loading || !coinList) {
          return (
            <CenteredSpinner>
              <GridLoader
                // css={override}
                sizeUnit={"px"}
                size={18}
                color={'#36D7B7'}
            />
            </CenteredSpinner>
          )
        } else if (!firstVisit && !prices) {
          return (
            <CenteredSpinner>
              <GridLoader
                // css={override}
                sizeUnit={"px"}
                size={18}
                color={'#36D7B7'}
            />
            </CenteredSpinner>
          )
        }

        return <div>{children}</div>
      }}
    </AppContext.Consumer>
  )
}

export default Content
