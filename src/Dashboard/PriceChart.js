import React from 'react';
import highchartsConfig from './HighchartsConfig';
import { Tile } from '../Shared/Tile';
import ReactHighcharts from 'react-highcharts';
import { AppContext } from '../App/AppProvider';
import HighchartsTheme from './HighchartsTheme';
import ChartSelect from './ChartSelect';

// set Highcharts theme
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {({ historical, changeChartSelect }) => (
        <Tile>
          <ChartSelect
            defaultValue={"months"}
            onChange={e => changeChartSelect(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </ChartSelect>
          <ReactHighcharts config={highchartsConfig(historical)} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
};

export default PriceChart;
