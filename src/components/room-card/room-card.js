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

  _attachEventHandlers() {
    const {$indicators, $controlPrev, $controlNext, $images} = this;

    $indicators.click( (e) => {
      if (!e.target.classList.contains('indicator') || e.target.classList.contains('disabled')) {
        return
      }

      const slideTo = $(e.target).data().slideTo;
      const currentSlide = $images.data().activeSlide;

      if (slideTo != currentSlide) {
        $images.find('div').eq(currentSlide).removeClass('active')
        $images.find('div').eq(slideTo).addClass('active')

        $indicators.find('li').eq(currentSlide).removeClass('active')
        $indicators.find('li').eq(slideTo).addClass('active')
        
        $images.data({'active-slide': slideTo})
        $indicators.data({'active-slide': slideTo})
      }
    })

    $controlPrev.click( (e) => {
      console.log(e.target)
    })

    $controlNext.click( (e) => {
      console.log(e.target)
    })
  }
}

$('.js_room_card').each(function() {
  new RoomCard(this);
})