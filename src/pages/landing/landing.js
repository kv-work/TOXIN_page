import '../../main.scss';
import './landing.scss';
import data from './data.json';

//import favicon
import '../../favicons/favicon'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));

class Landing {
  constructor(node) {
    this.$landing = $(node);
    this.bgArr = data.landingBG;
    this.currentBG = 0;
    this.images = [];

    this._init();
  }

  _init() {
    this._preloadImages()
    this._setBGImage(this.currentBG);

    const timerId = setInterval(() => {
      const img = (this.currentBG + 1) % this.bgArr.length;
      this._setBGImage(img);
    }, 10000)
  }

  _preloadImages() {
    this.bgArr.forEach(imgUrl => {
      const image = require(`${imgUrl}`).default;
      this.images.push(image);
    });
  }

  _setBGImage(img) {
    this.$landing.css({'background-image': `url(${this.images[img]})`});
    this.currentBG = img;
  }
}

$('.js_landing').each(function() {
  new Landing(this)
})