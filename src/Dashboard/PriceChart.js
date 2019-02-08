import React from 'react';
import highchartsConfig from './HighchartsConfig';
import { Tile } from '../Shared/Tile';
import ReactHighcharts from 'react-highcharts';
import { AppContext } from '../App/AppProvider';

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {({historical}) => (
        <Tile>
          <ReactHighcharts config={highchartsConfig()} />
        </Tile>
      )}
    </AppContext.Consumer>
  )
}

export default PriceChart
