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
    pieHole: 0.9,
    pieSliceTextStyle: {
      color: 'black'
    },
    slices: {
      0: {color: '#FFE39C'},
      1: {color: '#6FCF97'},
      2: {color: '#BC9CFF'},
      3: {color: '#919191'}
    },
    legend: {
      position: 'right',
      textStyle: { color: 'rgba(31, 32, 65, 0.75)' }
    },
    title: 'Впечатления от номера',
    titleTextStyle: {
      color: '#1F2041',
      fontSize: 19,
      fontName: 'Quicksand, "Open Sans", sans-serif'
    },
    chartArea: {left: 0, top: 0, width: '100%', height: '80%'},
    pieSliceText: 'none'
  };

  $('.js_pie_chart').each(function() {
    const pieChart = new GoogleCharts.api.visualization.PieChart(this);
    pieChart.draw(pieData, pieOptions);
  })

}