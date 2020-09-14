import './landing.scss';
import $ from 'jquery';
import data from './data.json';

class Landing {
  constructor(node) {
    this.$landing = $(node);
    this.bgArr = data.landingBG;
    this.currentBG = 0;

    this._init();
  }

  _init() {
    this._setBGImage(this.currentBG);

    setInterval(() => {
      const img = (this.currentBG + 1) % this.bgArr.length;
      this._setBGImage(img);
    }, 10000);
  }

  _setBGImage(img) {
    this.$landing.css({ 'background-image': `url(${this.bgArr[img]})` });
    this.currentBG = img;
  }
}

$('.js-landing').each(function addLanding() {
  const landing = new Landing(this);

  return landing;
});
