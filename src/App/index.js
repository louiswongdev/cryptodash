import React, { Component } from 'react';
import AppProvider from './AppProvider';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import Settings from '../Settings';
import Dashboard from '../Dashboard';
import Content from '../Shared/Content';
import Styles from '../Shared/Styles';
import { Tile } from '../Shared/Tile';

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar/>
          <Content>
            <Settings />
            <Dashboard />
          </Content>
          <Styles />
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
