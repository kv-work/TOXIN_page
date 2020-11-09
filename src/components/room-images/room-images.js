import $ from 'jquery';
import './img/image-loader';
import data from './data.json';

class RoomImagesBlock {
  constructor(node) {
    this.$node = $(node);
    this.room = this.$node.data('room');

    this._init();
  }

  _init() {
    this._addImages();
    this._createCarouselcontrols();
    this._attachEventHandlers();
  }

  _addImages() {
    const images = data.images[this.room];
    const { $node } = this;

    images.forEach((element, idx) => {
      const $image = $('<div>', { class: 'room_images__image' });
      $image.css({
        'background-image': `url(${element})`,
      });

      if (idx === 0) {
        $image.addClass('active');
        $node.data({ 'active-slide': 0 });
      }

      $node.append($image);
    });
  }

  _createCarouselcontrols() {
    const images = data.images[this.room];
    const { $node } = this;

    this.$indicators = $('<ol>', { class: 'room_images__indicators_block' });
    this.$controlPrev = $('<div>', { class: 'room_images__control_prev' });
    this.$controlNext = $('<div>', { class: 'room_images__control_next' });

    const $controlIconPrev = $('<i>', {
      class: 'material-icons room_images__control_icon',
      text: 'expand_more',
    });
    const $controlIconNext = $('<i>', {
      class: 'material-icons room_images__control_icon',
      text: 'expand_more',
    });

    this.$controlPrev.append($controlIconPrev);
    this.$controlNext.append($controlIconNext);

    images.forEach((_, idx) => {
      const $indicator = $('<li>', {
        class: 'room_images__indicator',
        'data-slide-to': idx,
      });

      if (idx === 0) {
        $indicator.addClass('active');
        this.$indicators.data({ 'active-slide': 0 });
      }

      this.$indicators.append($indicator);
    });

    if (images.length > 1) {
      $node
        .append(this.$controlPrev)
        .append(this.$controlNext);
    }

    $node.append(this.$indicators);
  }

  _changeSlide(slide) {
    const images = data.images[this.room];
    const { $indicators, $node } = this;
    const numOfSlides = images.length;
    const currentSlide = $node.data().activeSlide;

    if (slide !== currentSlide && slide <= numOfSlides) {
      $node.find('.room_images__image').eq(currentSlide).removeClass('active');
      $node.find('.room_images__image').eq(slide).addClass('active');

      $indicators.find('li').eq(currentSlide).removeClass('active');
      $indicators.find('li').eq(slide).addClass('active');

      $node.data({ 'active-slide': slide });
      $indicators.data({ 'active-slide': slide });
    }
  }

  _attachEventHandlers() {
    const {
      $indicators,
      $controlNext,
      $controlPrev,
    } = this;

    $indicators.on('click', this._clickOnIndicatorsHandler.bind(this));

    $controlPrev.on('click', this._clickOnCtrlBtnsHandler.bind(this));

    $controlNext.on('click', this._clickOnCtrlBtnsHandler.bind(this));
  }

  _clickOnIndicatorsHandler(event) {
    const $target = $(event.target);
    const { slideTo } = $target.data();

    if ($target.hasClass('room_images__indicator')) {
      this._changeSlide(slideTo);
    }
  }

  _clickOnCtrlBtnsHandler(event) {
    const images = data.images[this.room];
    const numOfSlides = images.length;
    const currentSlide = this.$node.data().activeSlide;
    const controlBtn = event.target;
    if (controlBtn.classList.contains('room_images__control_icon')) {
      const slide = (currentSlide - 1 + numOfSlides) % numOfSlides;

      this._changeSlide(slide);
    }
    if (controlBtn.classList.contains('room_images__control_icon')) {
      const slide = (currentSlide + 1) % numOfSlides;

      this._changeSlide(slide);
    }
  }
}

$('.js-room_images').each(function addRoomImages() {
  const roomImages = new RoomImagesBlock(this);

  return roomImages;
});
