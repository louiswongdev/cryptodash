import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';
import Search from './Search';

export default () => {
  return (
    <>
      {/* Only show children in <Page> component state.page === "settings"  */}
      <Page name="settings">
        <WelcomeMessage />
        <CoinGrid topSection />
        <ConfirmButton />
        <Search />
        <CoinGrid />
      </Page>
      
    </>
  )
}
