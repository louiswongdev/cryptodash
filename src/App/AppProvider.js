import React, { Component } from 'react';
import _ from 'lodash';
import ModalMessage from '../Shared/ModalMessage';
const cc = require('cryptocompare');


export const AppContext = React.createContext();

const MAX_FAVORITES = 12;

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      loading: true,
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      prices: [],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      open: false,
      setFilteredCoins: this.setFilteredCoins
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
  };

  fetchCoins = async () => { 
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList, loading: false });
  };

  fetchPrices = async () => {
    // Don't fetch prices if first visit
    if (this.state.firstVisit) return;

    let prices = await this.prices();
    this.setState(prevState => ({
      prices: [...prevState.prices, ...prices],
      loading: false
    }));
  }

  prices = async () => {
    let returnData = [];
    for (let favs of this.state.favorites) {
      try {
        let priceData = await cc.priceFull(favs, 'USD');
        returnData.push(priceData);
      } catch (e) {
        console.warn('Fetch price error: ', e);
      }
    }
    return returnData;
  }

  addCoin = key => {
    let favorites = [...this.state.favorites];
    
    if (favorites.length < MAX_FAVORITES) {
      this.setState(prevState => ({
        favorites: [...prevState.favorites, key]
      }));
      console.log(favorites);
    } else {
      this.onOpenModal();
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  // Use lodash to check if coin in state.favorites
  isInFavorites = key => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    }, () => {
      this.fetchPrices();
    });

    // Set item in LS
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  savedSettings() {
    // Get cryptoDashData from LS
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) return { page: 'settings', firstVisit: true };

    // If we have data in LS, return that data to our state
    let { favorites } = cryptoDashData;
    // Since we are already spreading in this function via ...this.savedSettings() 
    // in the state, we can simply return {favorites}

    return { favorites };
  }

  setPage = page => this.setState({ page });

  // Modal handlers
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  setFilteredCoins = filteredCoins => this.setState({filteredCoins});

  render() {
    return (
      <>
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
      <ModalMessage open={this.state.open} close={this.onCloseModal} message={'coinMaxed'} />
    </>
    );
  }
}

export default AppProvider;
