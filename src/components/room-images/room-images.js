import '../../main.scss';
import './room-images.scss';
import data from './data.json';

class RoomImagesBlock {
  constructor(node) {
    this.$node = $(node);
    this.room = this.$node.data().room;

    this.images = data.images[this.room];

    this._init();
  }

  _init() {
    this._addImages();
    this._createCarouselcontrols();
    this._attachEventHandlers();
  }

  _addImages() {
    const {images, $node} = this;

    images.forEach( (element, idx) => {

      const $image = $('<div>', { class: 'room_images__image'});
      const imgUrl = require(`${element}`).default;
      
      $image.css({
        'background-image': `url(${imgUrl})`,
      });

      if (idx === 0) {
        $image.addClass('active');
        $node.data({'active-slide': 0});
      }

      $node.append($image);
    });
  }

  _createCarouselcontrols() {
    const {images, $node} = this;

    this.$indicators = $('<ol>', {class: 'room_images__indicators_block'});
    this.$controlPrev = $('<div>', {class: 'room_images__control_prev'});
    this.$controlNext = $('<div>', {class: 'room_images__control_next'});

    const $controlIconPrev = $('<i>', {
      class: 'material-icons room_images__control_icon',
      text: 'expand_more'
    })
    const $controlIconNext = $('<i>', {
      class: 'material-icons room_images__control_icon',
      text: 'expand_more'
    })

    this.$controlPrev.append($controlIconPrev)
    this.$controlNext.append($controlIconNext)

    images.forEach( (_, idx) => {
      const $indicator = $('<li>', {
        class: 'room_images__indicator',
        'data-slide-to': idx
      })

      if (idx === 0) {
        $indicator.addClass('active');
        this.$indicators.data({'active-slide': 0});
      }

      this.$indicators.append($indicator);
    })

    if (images.length > 1) {
      $node
        .append(this.$controlPrev)
        .append(this.$controlNext);
    }

    $node.append(this.$indicators);
  }

  _changeSlide(slide) {
    const {$indicators, $node, images} = this;
    const numOfSlides = images.length;
    const currentSlide = $node.data().activeSlide;

    if (slide != currentSlide && slide <= numOfSlides) {
      $node.find('.room_images__image').eq(currentSlide).removeClass('active')
      $node.find('.room_images__image').eq(slide).addClass('active')
  
      $indicators.find('li').eq(currentSlide).removeClass('active')
      $indicators.find('li').eq(slide).addClass('active')
          
      $node.data({'active-slide': slide})
      $indicators.data({'active-slide': slide})
    }
  }

  _attachEventHandlers() {
    const {$indicators, $controlNext, $controlPrev, $node, images} = this;
    const numOfSlides = images.length;

    $indicators.click( (e) => {
      const $target = $(e.target)

      if ( $target.hasClass('room_images__indicator') ) {
        const slideTo = $(e.target).data().slideTo;

        this._changeSlide(slideTo)
      }
    })

    $controlPrev.click( (e) => {
      if ( e.target.classList.contains('room_images__control_icon') ) {
        const currentSlide = $node.data().activeSlide;
        const slide = (currentSlide - 1 + numOfSlides) % numOfSlides;

        this._changeSlide(slide);
      }
    })

    $controlNext.click( (e) => {
      if ( e.target.classList.contains('room_images__control_icon') ) {
        const currentSlide = $node.data().activeSlide;
        const slide = (currentSlide + 1) % numOfSlides;

        this._changeSlide(slide);
      }
    })
  }
}

$('.js_room_images').each(function() {
  new RoomImagesBlock(this)
})