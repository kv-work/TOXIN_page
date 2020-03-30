import '../../main.scss';
import './pie-chart.scss';
import data from './data.json';

class PieChart {
  constructor(node) {
    this.$node = $(node);
    this.$container = this.$node.find('.pie_chart__content');
    this.data = data.impressions;

    this._init()
  }

  _init() {
    this._addDonutChart()
  }

  _addDonutChart() {

  }

}

$('.js_pie_chart').each(function() {
  new PieChart(this)
})