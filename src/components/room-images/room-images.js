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
      if (idx !== 0) {
        const $imageWrapper = $('<div>', {
          class: 'room-images__image-wrapper js-room-images__image-wrapper',
        });
        const $image = $('<img>', {
          class: 'room-images__image js-room-images__image',
          src: element,
          alt: `room ${this.room} image ${idx}`,
        });

        $imageWrapper.append($image);
        $node.append($imageWrapper);
      }
    });

    this.$imageWrapper = $node.find('.js-room-images__image-wrapper');
  }

  _createCarouselcontrols() {
    const images = data.images[this.room];
    const { $node } = this;
    $node.data({ 'active-slide': 0 });

    this.$indicators = $('<ol>', { class: 'room-images__indicators-block' });
    this.$controlPrev = $('<div>', { class: 'room-images__control-prev' });
    this.$controlNext = $('<div>', { class: 'room-images__control-next' });

    const $controlIconPrev = $('<i>', {
      class: 'material-icons room-images__control-icon',
      text: 'expand_more',
    });
    const $controlIconNext = $('<i>', {
      class: 'material-icons room-images__control-icon',
      text: 'expand_more',
    });

    this.$controlPrev.append($controlIconPrev);
    this.$controlNext.append($controlIconNext);

    images.forEach((_, idx) => {
      const $indicator = $('<li>', {
        class: 'room-images__indicator js-room-images__indicator',
        'data-slide-to': idx,
      });

      if (idx === 0) {
        $indicator.addClass('room-images__indicator_active');
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
    const { $indicators, $node, $imageWrapper } = this;
    const numOfSlides = images.length;
    const currentSlide = $node.data().activeSlide;

    if (slide !== currentSlide && slide <= numOfSlides) {
      $imageWrapper.eq(currentSlide).removeClass('room-images__image-wrapper_active');
      $imageWrapper.eq(slide).addClass('room-images__image-wrapper_active');

      const $indicator = $indicators.find('.js-room-images__indicator');
      $indicator.eq(currentSlide).removeClass('room-images__indicator_active');
      $indicator.eq(slide).addClass('room-images__indicator_active');

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

    $indicators.on('click.roomImages', this._handleIndicatorClick.bind(this));

    $controlPrev.on('click.roomImages', this._handleControlButtonClick.bind(this));

    $controlNext.on('click.roomImages', this._handleControlButtonClick.bind(this));
  }

  _handleIndicatorClick(event) {
    const $target = $(event.target);
    const { slideTo } = $target.data();

    if ($target.hasClass('room-images__indicator')) {
      this._changeSlide(slideTo);
    }
  }

  _handleControlButtonClick(event) {
    const images = data.images[this.room];
    const numOfSlides = images.length;
    const currentSlide = this.$node.data().activeSlide;
    const controlBtn = event.target;
    if (controlBtn.classList.contains('room-images__control-icon')) {
      const slide = (currentSlide - 1 + numOfSlides) % numOfSlides;

      this._changeSlide(slide);
    }
    if (controlBtn.classList.contains('room-images__control-icon')) {
      const slide = (currentSlide + 1) % numOfSlides;

      this._changeSlide(slide);
    }
  }
}

$('.js-room-images').each(function addRoomImages() {
  const roomImages = new RoomImagesBlock(this);

  return roomImages;
});
