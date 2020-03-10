import './room-card.scss'
import roomsData from './data.json'
import RateButton from '../rate-button/rate-button'

class RoomCard {
  constructor(node) {
    this.$node = $(node);
    this.data = this.$node.data();

    this.$numberBlock = this.$node.find('.room_card__number_block');
    this.$imagesBlock = this.$node.find('.room_card__images_block');
    this.$priceBlock = this.$node.find('.room_card__price_block');
    this.$rateBlock = this.$node.find('.room_card__rate_block');
    this.$reviewsBlock = this.$node.find('.room_card__reviews_block');

    this.rateButton = new RateButton( this.$rateBlock.find('.js_rate_button')[0] );

    this._init()
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

    this._attachEventHandlers()
  }

  _getData() {
    this.numOfRoom = this.data.number;

    this.roomData = roomsData.rooms[this.numOfRoom]
  }

  //Создаем карусель картинок
  _createRoomImageBlocks() {
    const {$imagesBlock, numOfRoom, roomData} = this;
    const imgArr = roomData.images;
    this.$images = $('<div>', {class: 'room_card__images'})
    this.$indicators = $('<ol>', {class: 'room_card__indicators'})


    //Добавляем слайды
    imgArr.forEach((item, idx, array) => {
      
      const $roomImg = $('<div>', { class: 'room_card__image'});
      const imgUrl = require(`${item}`).default;
      
      $roomImg.css({
          'background-image': `url(${imgUrl})`
        })
      
      const  isActive = idx === 0;

      if (isActive) {
        $roomImg.addClass('active')
        this.$images.data({'active-slide': 0})
      }

      this.$images.append($roomImg)
    })

    //Добавляем индикаторы
    for (let i = 0; i < 4; i++) {
      const $indicator = $('<li>', {
        'data-slide-to': i,
        class: 'indicator'
      })

      if (i === 0) {
        $indicator.addClass('active')
        this.$indicators.data({'active-slide': 0})
      }

      if (!imgArr[i]) {
        $indicator.addClass('disabled')
      }

      this.$indicators.append($indicator)
    }

    //Элементы управления
    this.$controlPrev = $('<div>', {class: 'room_card__control_prev'})
    this.$controlNext = $('<div>', {class: 'room_card__control_next'})

    const $controlIconPrev = $('<i>', {
      class: 'material-icons room_card__control_icon',
      text: 'expand_more'
    })
    const $controlIconNext = $('<i>', {
      class: 'material-icons room_card__control_icon',
      text: 'expand_more'
    })

    this.$controlPrev.append($controlIconPrev)
    this.$controlNext.append($controlIconNext)

 
    $imagesBlock.append(this.$images)

    if (imgArr.length > 1) {
      $imagesBlock.append(this.$controlPrev)
      $imagesBlock.append(this.$controlNext)
    }

    $imagesBlock.append(this.$indicators)
  }

  _displayLuxSign() {
    const {$numberBlock} = this;

    $numberBlock.append('<span class="room_card__lux_flag">люкс</span>')
  }

  _displayPrice() {
    const {$priceBlock, roomData} = this;
    const formattedPrice = roomData.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')

    $priceBlock.prepend('<span class="room_card__price">'+formattedPrice+'₽</span>')
  }

  _displayRoomRate() {
    const {rateButton, roomData} = this;
    const roomRate = roomData.rate;
    
    rateButton.setRate(roomRate);
  }

  _displayNumOfReviews() {
    const {$reviewsBlock, roomData} = this;
    const numOfReviews = roomData.numOfReviews;

    $reviewsBlock.prepend('<span class="room_card__number_of_reviews">'+numOfReviews+'</span>')
  }

  _changeSlide(slide) {
    const {$indicators, $images, roomData} = this;
    const numOfSlides = roomData.images.length;
    const currentSlide = $images.data().activeSlide;

    if (slide != currentSlide && slide <= numOfSlides) {
      $images.find('div').eq(currentSlide).removeClass('active')
      $images.find('div').eq(slide).addClass('active')
  
      $indicators.find('li').eq(currentSlide).removeClass('active')
      $indicators.find('li').eq(slide).addClass('active')
          
      $images.data({'active-slide': slide})
      $indicators.data({'active-slide': slide})
    }
  }

  _attachEventHandlers() {
    const {$indicators, $controlPrev, $controlNext, $images, roomData} = this;
    const numOfSlides = roomData.images.length;

    $indicators.click( (e) => {
      const $target = $(e.target)

      if ( $target.hasClass('indicator') && !$target.hasClass('disabled') ) {
        const slideTo = $(e.target).data().slideTo;

        this._changeSlide(slideTo)
      }
    })

    $controlPrev.click( (e) => {
      if ( e.target.classList.contains('room_card__control_icon') ) {
        const currentSlide = $images.data().activeSlide;
        const slide = (currentSlide - 1 + numOfSlides) % numOfSlides;

        this._changeSlide(slide);
      }
    })

    $controlNext.click( (e) => {
      if ( e.target.classList.contains('room_card__control_icon') ) {
        const currentSlide = $images.data().activeSlide;
        const slide = (currentSlide + 1) % numOfSlides;

        this._changeSlide(slide);
      }
    })
  }
}

$('.js_room_card').each(function() {
  new RoomCard(this);
})