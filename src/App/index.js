import React, { Component } from 'react';
import AppProvider from './AppProvider';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar/>
          <h1>Welcome to CryptoDash</h1>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
