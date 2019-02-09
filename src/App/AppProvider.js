import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ModalMessage from '../Shared/ModalMessage';
const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 12;

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      loading: true,
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      timeInterval: 'months',
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      open: false,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
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
      prices: [...prices],
      loading: false
    }));
    // this.setState({prices, loading: false})
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;

    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          // x value --> date / y value --> price
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];

    this.setState({ historical });
  };

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
  };

  historical = () => {
    let promises = [];

    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ['USD'],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
  };

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
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: 'dashboard',
        currentFavorite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );

    // Set item in LS
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  setCurrentFavorite = sym => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null
      },
      this.fetchHistorical
    );

    // Set currentFavorite in localStorage (keep existing favorites array and add in new sym)
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('cryptoDash')),
        currentFavorite: sym
      })
    );
  };

  savedSettings() {
    // Get cryptoDashData from LS
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) return { page: 'settings', firstVisit: true };

    // If we have data in LS, return that data to our state
    let { favorites, currentFavorite } = cryptoDashData;
    // Since we are already spreading in this function via ...this.savedSettings()
    // in the state, we can simply return {favorites}

    return { favorites, currentFavorite };
  }

  setPage = page => this.setState({ page });

  // Modal handlers
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  changeChartSelect = value => {
    this.setState({ timeInterval: value, historical: null }, this.fetchHistorical);
  };

  render() {
    return (
      <>
        <AppContext.Provider value={this.state}>
          {this.props.children}
        </AppContext.Provider>
        <ModalMessage
          open={this.state.open}
          close={this.onCloseModal}
          message={'coinMaxed'}
        />
      </>
    );
  }
}

export default AppProvider;
