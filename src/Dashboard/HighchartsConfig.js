export default function(historical) {
  return {
    title: {
      text: ''
    },

    // subtitle: {
    //   text: 'Source: thesolarfoundation.com'
    // },
    xAxis: { type: 'datetime' },
    yAxis: {
      title: {
        text: 'Price'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        // animation: false,
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: historical,
      //  series takes an array of objects with name and data as keys
      // [
      //   {
      //     name: 'Manufacturing',
      //     data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      //   },
      //   {
      //     name: 'Sales & Distribution',
      //     data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      //   }
      // ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  };
}
