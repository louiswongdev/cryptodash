import React, { Component } from 'react';
import highchartsConfig from './HighchartsConfig';
import { Tile } from '../Shared/Tile';
import ReactHighcharts from 'react-highcharts';
import { AppContext } from '../App/AppProvider';
import HighchartsTheme from './HighchartsTheme';
import ChartSelect from './ChartSelect';

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export class PriceChart extends Component {
  componentDidMount() {
    // set Highcharts theme
    console.log(ReactHighcharts.Highcharts.setOptions(HighchartsTheme));
  }

  componentWillUnmount() {
    console.log('unmounted')
  }

  afterRender = chart => {
    chart.update({
      chart: {
        backgroundColor: 'white'
      },
      yAxis: {
        // gridLineWidth: 0,
        gridLineColor: '#e9e9e9',
        labels: {
          style: {
            color: '#999'
          }
        }
      }
    });

    console.log(chart.options.chart);
  };

  forceRender = () => {
    this.forceUpdate();
  };

  render() {
    // ReactHighcharts.Highcharts.setOptions(HighchartsTheme);
    return (
      <AppContext.Consumer>
        {({ historical, changeChartSelect, checked }) => (
          <Tile>
            <ChartSelect
              defaultValue={'months'}
              onChange={e => changeChartSelect(e.target.value)}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </ChartSelect>
            {!checked ? (
              <ReactHighcharts
                config={highchartsConfig(historical)}
                // callback={this.afterRender}
              />
            ) : (
              <ReactHighcharts
                config={highchartsConfig(historical)}
                callback={this.afterRender}
              />
            )}
          </Tile>
        )}
      </AppContext.Consumer>
    );
  }
}

export default PriceChart;
