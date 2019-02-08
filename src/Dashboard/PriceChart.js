import React from 'react';
import highchartsConfig from './HighchartsConfig';
import { Tile } from '../Shared/Tile';
import ReactHighcharts from 'react-highcharts';
import { AppContext } from '../App/AppProvider';
import HighchartsTheme from './HighchartsTheme';

// set Highcharts theme
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

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
