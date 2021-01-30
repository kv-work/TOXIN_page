import $ from 'jquery';
import roomsData from './data.json';
import RateButton from '../rate-button/rate-button';
import template from './template.pug';

export default class RoomCard {
  constructor(node) {
    this.$node = $(node);
    this.data = this.$node.data();

    this.$numberBlock = this.$node.find('.js-room-card__number-block');
    this.$imagesBlock = this.$node.find('.js-room-card__images-block');
    this.$priceBlock = this.$node.find('.js-room-card__price-block');
    this.$rateBlock = this.$node.find('.js-room-card__rate-block');
    this.$reviewsBlock = this.$node.find('.js-room-card__reviews-block');

    this.rateButton = new RateButton(this.$rateBlock.find('.js-rate-button')[0]);

    this._init();
  }

  _init() {
    this._getData();
    this._createRoomImageBlocks();
    this._displayPrice();

    if (this.roomData.isLux) {
      this._displayLuxSign();
    }

    this._displayRoomRate();
    this._displayNumOfReviews();

    this._attachEventHandlers();
  }

  static template(roomNum) {
    const params = { number: roomNum };
    return template({ params });
  }

  _getData() {
    this.numOfRoom = this.data.number;
    this.roomData = roomsData.rooms[this.numOfRoom];
  }

  _createRoomImageBlocks() {
    const { $imagesBlock, roomData } = this;
    const imgArr = roomData.images;
    this.$images = $('<div>', { class: 'room-card__images' });
    this.$indicators = $('<ol>', { class: 'room-card__indicators' });

    imgArr.forEach((item, idx) => {
      const $roomImg = $('<div>', { class: 'room-card__image js-room-card__image' });

      $roomImg.css({
        'background-image': `url(${item})`,
      });

      const isActive = idx === 0;

      if (isActive) {
        $roomImg.addClass('active');
        this.$images.data({ 'active-slide': 0 });
      }

      this.$images.append($roomImg);
    });

    for (let i = 0; i < 4; i += 1) {
      const $indicator = $('<li>', {
        'data-slide-to': i,
        class: 'room-card__indicator js-room-card__indicator',
      });

      if (i === 0) {
        $indicator.addClass('active');
        this.$indicators.data({ 'active-slide': 0 });
      }

      if (!imgArr[i]) {
        $indicator.addClass('disabled');
      }

      this.$indicators.append($indicator);
    }

    this.$controlPrev = $('<div>', { class: 'room-card__control-prev' });
    this.$controlNext = $('<div>', { class: 'room-card__control-next' });

    const $controlIconPrev = $('<i>', {
      class: 'material-icons room-card__control-icon',
      text: 'expand_more',
    });
    const $controlIconNext = $('<i>', {
      class: 'material-icons room-card__control-icon',
      text: 'expand_more',
    });

    this.$controlPrev.append($controlIconPrev);
    this.$controlNext.append($controlIconNext);

    $imagesBlock.append(this.$images);

    if (imgArr.length > 1) {
      $imagesBlock.append(this.$controlPrev);
      $imagesBlock.append(this.$controlNext);
    }

    $imagesBlock.append(this.$indicators);
  }

  _displayLuxSign() {
    const { $numberBlock } = this;

    $numberBlock.append('<span class="room-card__lux-flag">люкс</span>');
  }

  _displayPrice() {
    const { $priceBlock, roomData } = this;
    const formattedPrice = roomData.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

    $priceBlock.prepend(`<span class="room-card__price">${formattedPrice}₽</span>`);
  }

  _displayRoomRate() {
    const { rateButton, roomData } = this;
    const roomRate = roomData.rate;
    rateButton.setRate(roomRate);
  }

  _displayNumOfReviews() {
    const { $reviewsBlock } = this;
    const { numOfReviews } = this.roomData;

    $reviewsBlock.prepend(`<span class="room-card__number-of-reviews">${numOfReviews}</span>`);
  }

  _changeSlide(slide) {
    const { $indicators, $images, roomData } = this;
    const numOfSlides = roomData.images.length;
    const currentSlide = $images.data().activeSlide;

    if (slide !== currentSlide && slide <= numOfSlides) {
      const $image = $images.find('.js-room-card__image');
      $image.eq(currentSlide).removeClass('active');
      $image.eq(slide).addClass('active');

      const $indicator = $indicators.find('.js-room-card__indicator');
      $indicator.eq(currentSlide).removeClass('active');
      $indicator.eq(slide).addClass('active');

      $images.data({ 'active-slide': slide });
      $indicators.data({ 'active-slide': slide });
    }
  }

  _attachEventHandlers() {
    const {
      $indicators,
      $controlPrev,
      $controlNext,
    } = this;

    $indicators.on('click.roomCard', this._handleIndicatorsClick.bind(this));

    $controlPrev.on('click.roomCard', this._handleControlPrevClick.bind(this));

    $controlNext.on('click.roomCard', this._handleControlNextClick.bind(this));
  }

  _handleIndicatorsClick(e) {
    const $target = $(e.target);

    if ($target.hasClass('js-room-card__indicator') && !$target.hasClass('disabled')) {
      const { slideTo } = $(e.target).data();

      this._changeSlide(slideTo);
    }
  }

  _handleControlPrevClick(e) {
    const { $images, roomData } = this;

    const numOfSlides = roomData.images.length;
    if (e.target.classList.contains('room-card__control-icon')) {
      const currentSlide = $images.data().activeSlide;
      const slide = (currentSlide - 1 + numOfSlides) % numOfSlides;

      this._changeSlide(slide);
    }
  }

  _handleControlNextClick(e) {
    const { $images, roomData } = this;

    const numOfSlides = roomData.images.length;
    if (e.target.classList.contains('room-card__control-icon')) {
      const currentSlide = $images.data().activeSlide;
      const slide = (currentSlide + 1) % numOfSlides;

      this._changeSlide(slide);
    }
  }
}

$('.js-room-card').each(function addRoomCard() {
  const roomCard = new RoomCard(this);

  return roomCard;
});
