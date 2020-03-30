import '../../main.scss';
import './pie-chart.scss';

import {GoogleCharts} from 'google-charts';

GoogleCharts.load(drawCharts);

function drawCharts() {

  const pieData = GoogleCharts.api.visualization.arrayToDataTable([
      ['room', 'imprassions'],
      ['Великолепно', 130],
      ['Хорошо', 65],
      ['Удовлетворительно', 65],
      ['Разочарован', 0]
    ]);

  const pieOptions = {
    pieHole: 0.91,
    // pieStartAngle: 180,
    reverseCategories: true,
    sliceVisibilityThreshold: 0,
    pieSliceTextStyle: {
      color: 'black'
    },
    slices: {
      3: {color: '#FFE39C'},
      2: {color: '#6FCF97'},
      1: {color: '#BC9CFF'},
      0: {color: '#919191'},  
    },
    legend: {
      position: 'right',
      alignment: 'end',
      textStyle: { 
        color: 'rgba(31, 32, 65, 0.75)',
        fontSize: 14,
        fontName: 'Montserrat'
       }
    },
    title: 'Впечатления от номера',
    titleTextStyle: {
      color: '#1F2041',
      fontSize: 19,
      fontName: 'Quicksand, "Open Sans", sans-serif'
    },
    chartArea: {left: 11, top: 24, width: '100%', height: '120px'},
    pieSliceText: 'none',
    tooltip: {
      text: 'value',
      showColorCode: true,
      textStyle: {
        color: 'rgba(31, 32, 65, 0.75)',
        fontSize: 12,
        fontName: 'Montserrat',

      }
    }
  };

  $('.js_pie_chart').each(function() {
    const pieChart = new GoogleCharts.api.visualization.PieChart(this);
    pieChart.draw(pieData, pieOptions);
  })

}