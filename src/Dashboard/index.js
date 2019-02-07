import React from 'react';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';

export default () => {
  return (
    <>
      {/* Only show children in <Page> component state.page === "settings"  */}
      <Page name="dashboard">
      {console.log('rendering...')}
        <PriceGrid />
      </Page>
      
    </>
  )
}
